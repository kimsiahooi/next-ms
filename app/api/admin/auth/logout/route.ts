import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function POST() {
  try {
    const { success } = await auth.api.signOut({
      headers: await headers(),
    });

    if (!success) {
      throw new Error("User failed logout");
    }

    return NextResponse.json({
      success: true,
      message: "User logout successfully",
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "User failed logout",
      },
      { status: 500 },
    );
  }
}
