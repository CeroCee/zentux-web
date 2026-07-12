import { NextResponse, type NextRequest } from "next/server";

const privatePrefixes = ["/api/", "/admin", "/dashboard"];

export function proxy(request: NextRequest) {
  const response = NextResponse.next();
  const { pathname } = request.nextUrl;

  if (privatePrefixes.some((prefix) => pathname.startsWith(prefix))) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  return response;
}

export const config = {
  matcher: ["/api/:path*", "/admin/:path*", "/dashboard/:path*"],
};
