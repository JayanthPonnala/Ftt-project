import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_COOKIE_NAME, verifyAdminToken } from "@/lib/auth";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only run on /admin routes
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const isAuthenticated = await verifyAdminToken(token);

  // If hitting /admin/login while already authenticated -> redirect to dashboard
  if (pathname === "/admin/login") {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/admin/blog", request.url));
    }
    return NextResponse.next();
  }

  // If hitting /admin root -> redirect to /admin/blog or /admin/login
  if (pathname === "/admin") {
    return NextResponse.redirect(
      new URL(isAuthenticated ? "/admin/blog" : "/admin/login", request.url)
    );
  }

  // If hitting any protected /admin route and NOT authenticated -> redirect to /admin/login
  if (!isAuthenticated) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};

export default proxy;
