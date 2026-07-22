import { authenticatedAccountRequest } from "@/lib/account-api";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => ({}));
  return (await authenticatedAccountRequest(request, "/api/web/redeem", {
    licenseKey: typeof payload.licenseKey === "string" ? payload.licenseKey : "",
  })).response;
}
