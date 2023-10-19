import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get("filename") ?? "image";
  const file = request.body || "";
  const contentType = request.headers.get("content-type") || "text/plain";

  if (!request.body) {
    return new NextResponse("Not Found", { status: 404 });
  }
  const blob = await put(filename, file, {
    contentType,
    access: "public",
  });

  return NextResponse.json(blob);
}
