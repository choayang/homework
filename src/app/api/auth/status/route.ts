import { NextResponse } from "next/server";

export async function GET() {
  const hasGoogle =
    !!process.env.AUTH_GOOGLE_ID && !!process.env.AUTH_GOOGLE_SECRET;
  const hasEmailLogin = !!process.env.DEMO_PASSWORD;

  return NextResponse.json({
    google: hasGoogle,
    email: hasEmailLogin,
    message: !hasGoogle && !hasEmailLogin
      ? "AUTH_GOOGLE_ID/SECRET 또는 DEMO_PASSWORD를 .env에 설정해 주세요."
      : null,
  });
}
