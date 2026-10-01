import { authenticatedAccountRequest } from "@/lib/account-api";

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin || origin !== new URL(request.url).origin) {
    return Response.json({ error: "Solicitud no permitida." }, { status: 403 });
  }
  try {
    // Do not accept Stripe customer/subscription IDs from the browser.
    const result = await authenticatedAccountRequest(request, "/api/web/subscription/portal");
    result.response.headers.set("Cache-Control", "no-store");
    return result.response;
  } catch {
    return Response.json({ error: "No se pudo abrir Stripe. Intenta de nuevo más tarde." }, { status: 503 });
  }
}
