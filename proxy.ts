import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { ADMIN_LOGIN } from "@/constants/admin/path";
import { auth } from "@/lib/auth";

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // THIS IS NOT SECURE!
  // This is the recommended approach to optimistically redirect users
  // We recommend handling auth checks in each page/route
  if (!session) {
    return NextResponse.redirect(new URL(ADMIN_LOGIN, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/dashboard"], // Specify the routes the middleware applies to
};
