import NextAuth from "next-auth";
import Discord from "next-auth/providers/discord";

async function syncDiscordAccount(profile: { id: string; username?: string | null; global_name?: string | null; avatar?: string | null }) {
  const baseUrl = String(process.env.LICENSE_API_URL || process.env.NEXT_PUBLIC_LICENSE_API_URL || "").replace(/\/+$/, "");
  const secret = process.env.WEB_APP_SECRET;
  if (!baseUrl || !secret) return;
  const avatarUrl = profile.avatar
    ? `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png?size=256`
    : `https://cdn.discordapp.com/embed/avatars/${Number(profile.id.slice(-2)) % 6}.png`;
  const response = await fetch(`${baseUrl}/api/web/account/upsert`, {
    method: "POST",
    headers: { "content-type": "application/json", "x-web-secret": secret },
    body: JSON.stringify({
      discordUserId: profile.id,
      discordUsername: profile.global_name || profile.username || "Discord user",
      discordAvatarUrl: avatarUrl
    }),
    cache: "no-store"
  });
  if (!response.ok) throw new Error("No se pudo sincronizar la cuenta de Discord.");
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Discord({ authorization: { params: { scope: "identify" } } })],
  session: { strategy: "jwt" },
  trustHost: true,
  callbacks: {
    async signIn({ profile }) {
      if (!profile?.id) return false;
      await syncDiscordAccount(profile as Parameters<typeof syncDiscordAccount>[0]);
      return true;
    },
    async jwt({ token, profile }) {
      if (profile?.id) token.discordId = String(profile.id);
      return token;
    },
    async session({ session, token }) {
      session.user.discordId = String(token.discordId || token.sub || "");
      return session;
    }
  }
});
