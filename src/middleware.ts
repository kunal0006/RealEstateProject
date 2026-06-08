import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const userRole = (req.auth?.user as any)?.role;

  const isApiAuthRoute = nextUrl.pathname.startsWith("/api/auth");
  const isPublicRoute = ["/", "/properties", "/properties/[id]"].some(route => {
    if (route.includes("[id]")) {
      const regex = new RegExp(`^${route.replace("[id]", "[^/]+")}$`);
      return regex.test(nextUrl.pathname);
    }
    return nextUrl.pathname === route;
  });
  const isAuthRoute = ["/login", "/register"].includes(nextUrl.pathname);

  if (isApiAuthRoute) return NextResponse.next();

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/", nextUrl));
    }
    return NextResponse.next();
  }

  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  // RBAC checks
  if (nextUrl.pathname.startsWith("/admin") && userRole !== "ADMIN") {
    return NextResponse.redirect(new URL("/", nextUrl));
  }

  if (nextUrl.pathname.startsWith("/agent") && !["AGENT", "ADMIN"].includes(userRole)) {
    return NextResponse.redirect(new URL("/", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
