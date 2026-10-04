import { publicAppearance, ProfileAppearance } from '@/lib/profile-appearance';
type PublicProfile = { userId: string; name: string; username: string; avatar: string | null; banner: string | null; memberSince: string; staffRole: string | null; badge?: string | null; roles: { name: string; color: string }[]; appearance?: ProfileAppearance };
function staticImage(value: string | null) {
  if (!value) return null;
  if (/^\/api\/profile-images\/\d{16,22}\/(avatar|banner)\/[0-9a-f-]{36}$/i.test(value)) return value;
  // Static Discord image variants avoid autoplay, including for reduced-motion users.
  try { const url = new URL(value); return url.protocol === "https:" && url.hostname === "cdn.discordapp.com" ? url.href.replace(/\.gif(?=\?|$)/i, ".png") : null; } catch { return null; }
}

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!/^\d{16,22}$/.test(id)) return Response.json({ error: "Perfil inválido." }, { status: 400 });
  const base = String(process.env.LICENSE_API_URL || process.env.NEXT_PUBLIC_LICENSE_API_URL || "").replace(/\/+$/, "");
  try {
    const response = await fetch(`${base}/api/community-chat/profiles/${id}`, { cache: "no-store", signal: AbortSignal.timeout(10000) });
    if (!response.ok) return Response.json({ error: response.status === 404 ? "Este perfil no está disponible." : "No se pudo cargar el perfil. Inténtalo de nuevo." }, { status: response.status });
    const profile: PublicProfile = await response.json();
    // A second explicit boundary: no private account response is ever spread into this route.
    return Response.json({ userId: profile.userId, name: profile.name, username: profile.username, avatar: staticImage(profile.avatar),
      banner: staticImage(profile.banner), memberSince: profile.memberSince, staffRole: profile.staffRole,
      badge: ['owner', 'staff', 'buyer'].includes(profile.badge || '') ? profile.badge : null,
      roles: profile.roles.map(role => ({ name: role.name, color: role.color })), appearance: publicAppearance(profile.appearance) }, { headers: { "Cache-Control": "no-store" } });
  } catch { return Response.json({ error: "No se pudo cargar el perfil. Inténtalo de nuevo." }, { status: 503 }); }
}
