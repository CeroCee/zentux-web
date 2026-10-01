import { authenticatedAccountRequest } from "@/lib/account-api";

export async function GET(request: Request) {
  try {
    const result = await authenticatedAccountRequest(request, "/api/web/subscription");
    result.response.headers.set("Cache-Control", "no-store");
    return result.response;
  } catch {
    return Response.json({ error: "No se pudo consultar tu suscripción." }, { status: 503 });
  }
}
