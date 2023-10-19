import { del } from "@vercel/blob";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url") ?? "";

  if (url === "") {
    return new NextResponse("Not Found", { status: 404 });
  }

  await del(url);

  return new NextResponse(url, { status: 200 });
}
