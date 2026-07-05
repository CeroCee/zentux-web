import { authenticatedAccountRequest } from "@/lib/account-api";
export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  return (await authenticatedAccountRequest("/api/web/zenitx/checkout", { packageId: body.packageId })).response;
}

