import { auth } from "@/auth";

export async function authenticatedAccountRequest(path: string, body: Record<string, unknown> = {}) {
  const session = await auth();
  if (!session?.user?.discordId) {
    return { response: Response.json({ code: "unauthorized", error: "Inicia sesion con Discord." }, { status: 401 }) };
  }
  const baseUrl = String(process.env.LICENSE_API_URL || process.env.NEXT_PUBLIC_LICENSE_API_URL || "").replace(/\/+$/, "");
  const secret = process.env.WEB_APP_SECRET;
  if (!baseUrl || !secret) throw new Error("La cuenta Zentux no esta configurada.");
  const upstream = await fetch(`${baseUrl}${path}`, {
    method: "POST",
    headers: { "content-type": "application/json", "x-web-secret": secret },
    body: JSON.stringify({
      ...body,
      discordUserId: session.user.discordId,
      discordUsername: session.user.name || "Discord user",
      discordAvatarUrl: session.user.image || null
    }),
    cache: "no-store"
  });
  const data = await upstream.json().catch(() => ({ error: "Respuesta invalida del servidor." }));
  return { response: Response.json(data, { status: upstream.status }), data, session };
}

