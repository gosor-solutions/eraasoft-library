import { ENV } from "@/lib/env";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Define route categories
const GUEST_ONLY_ROUTES = ["/login", "/register"];
const PUBLIC_ROUTES = [
  "/",
  "/contact-us",
  "/forget-password",
  "/reset-password",
];

export function proxy(request: NextRequest) {
  const { nextUrl, cookies } = request;
  const token = cookies.get(ENV.AUTH_COOKIE_NAME)?.value;
  const isAuthenticated = !!token || ENV.DEV_AUTH_BYPASS;
  const isGuestOnlyRoute = GUEST_ONLY_ROUTES.some((route) =>
    nextUrl.pathname.startsWith(route),
  );

  // 1. Redirect authenticated users away from guest-only routes
  if (isAuthenticated && isGuestOnlyRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 2. Redirect unauthenticated users away from protected routes
  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) =>
      nextUrl.pathname === route || nextUrl.pathname.startsWith("/courses/"),
  );

  // Also consider static assets and api routes
  const isNextInternal =
    nextUrl.pathname.startsWith("/_next") ||
    nextUrl.pathname.startsWith("/api") ||
    nextUrl.pathname.includes(".");

  if (
    !isAuthenticated &&
    !isPublicRoute &&
    !isGuestOnlyRoute &&
    !isNextInternal
    // &&
    // nextUrl.pathname !== "/otp"
  ) {
    // Redirect to login
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
