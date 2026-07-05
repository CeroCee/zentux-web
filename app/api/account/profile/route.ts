import { authenticatedAccountRequest } from "@/lib/account-api";
export async function GET(request: Request) {
  return (await authenticatedAccountRequest(request, "/api/web/profile")).response;
}
