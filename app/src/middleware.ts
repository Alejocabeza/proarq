import { NextResponse } from "next/server";
import authConfig from "@app/lib/auth/auth.config";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);

const publicRoute = ["/"];
const authRoutes = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
];
const apiAuthPrefix = "/api/auth";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth;

  if (pathname.startsWith(apiAuthPrefix)) {
    return NextResponse.next();
  }

  if (publicRoute.includes(pathname)) {
    return NextResponse.next();
  }

  if (isLoggedIn && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (
    !isLoggedIn &&
    !authRoutes.includes(pathname) &&
    !publicRoute.includes(pathname)
  ) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
