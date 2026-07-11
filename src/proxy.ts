import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  // Example: clone the URL if you need to modify it
  // const url = request.nextUrl.clone();

  // Example: redirect
  // if (url.pathname === "/old") {
  //   url.pathname = "/new";
  //   return NextResponse.redirect(url);
  // }

  // Example: rewrite
  // if (url.pathname.startsWith("/docs")) {
  //   return NextResponse.rewrite(new URL("/documentation", request.url));
  // }

  // Example: authentication
  // const token = request.cookies.get("token");
  // if (!token && url.pathname.startsWith("/dashboard")) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico
     * - robots.txt
     * - sitemap.xml
     */
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};