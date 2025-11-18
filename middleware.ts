import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  const { user, response } = await updateSession(request);
  const isProtected = request.nextUrl.pathname.startsWith("/member");

  if (isProtected && !user) {
    const redirectUrl = new URL("/login", request.url);
    const redirectedFrom =
      request.nextUrl.pathname + (request.nextUrl.search || "");
    redirectUrl.searchParams.set("redirectedFrom", redirectedFrom);
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}

export const config = {
  matcher: ["/member/:path*"],
};

