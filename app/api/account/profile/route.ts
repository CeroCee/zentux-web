import { authenticatedAccountRequest } from "@/lib/account-api";
export async function GET() {
  return (await authenticatedAccountRequest("/api/web/profile")).response;
}

