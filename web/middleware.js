import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const isOpsApi = pathname.startsWith("/api/ops/");
  const isLogin = pathname === "/api/ops/login" || pathname === "/api/ops/logout";
  if (isOpsApi && !isLogin && !request.cookies.get("fe_ops")) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/api/ops/:path*"],
};
