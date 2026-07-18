import { authenticatedAccountRequest } from "@/lib/account-api";

export async function POST(request: Request) {
  return (await authenticatedAccountRequest(request, "/api/web/rewards/start")).response;
}
