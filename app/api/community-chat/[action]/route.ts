import { authenticatedAccountRequest } from "@/lib/account-api";

export async function POST(request: Request, { params }: { params: Promise<{ action: string }> }) {
  const { action } = await params;
  if (!["status", "send", "moderate"].includes(action)) return new Response(null, { status: 404 });
  const origin = request.headers.get("origin");
  if (!origin || new URL(request.url).origin !== origin) return Response.json({ error: "Solicitud no autorizada." }, { status: 403 });
  if (!request.headers.get("content-type")?.startsWith("application/json")) return new Response(null, { status: 415 });
  try {
    const input = await request.json();
    const body = action === "send" ? { content: input.content, requestId: input.requestId }
      : action === "moderate" ? { action: input.action, messageId: input.messageId, userId: input.userId } : {};
    return (await authenticatedAccountRequest(request, `/api/web/community-chat/${action}`, body)).response;
  } catch {
    return Response.json({ code: "unavailable", error: "No se pudo conectar con el chat. Tu mensaje no se ha borrado; puedes reintentarlo." }, { status: 503 });
  }
}
