import { auth } from "@/auth";

export async function authenticatedAccountRequest(
  request: Request,
  path: string,
  body: Record<string, unknown> = {}
) {
  const session = await auth();
  if (!session?.user?.discordId) {
    return { response: Response.json({ code: "unauthorized", error: "Inicia sesion con Discord." }, { status: 401 }) };
  }
  const baseUrl = String(process.env.LICENSE_API_URL || process.env.NEXT_PUBLIC_LICENSE_API_URL || "").replace(/\/+$/, "");
  const secret = process.env.WEB_APP_SECRET;
  const oidcToken = request.headers.get("x-vercel-oidc-token");
  if (!baseUrl || (!secret && !oidcToken)) throw new Error("La cuenta Zentux no esta configurada.");
  const headers: Record<string, string> = { "content-type": "application/json" };
  if (oidcToken) headers.authorization = `Bearer ${oidcToken}`;
  else if (secret) headers["x-web-secret"] = secret;
  const upstream = await fetch(`${baseUrl}${path}`, {
    method: "POST",
    headers,
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
