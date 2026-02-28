import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { ADMIN_LOGIN_PATH } from "@/constants/admin/path.constants";
import { auth } from "@/lib/auth";

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // THIS IS NOT SECURE!
  // This is the recommended approach to optimistically redirect users
  // We recommend handling auth checks in each page/route
  if (!session) {
    return NextResponse.redirect(new URL(ADMIN_LOGIN_PATH, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/dashboard", "/admin/organizations"], // Specify the routes the middleware applies to
};
