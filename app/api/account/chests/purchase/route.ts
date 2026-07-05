import { authenticatedAccountRequest } from "@/lib/account-api";
export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  return (await authenticatedAccountRequest(request, "/api/web/chests/purchase", { packageId: body.packageId })).response;
}
