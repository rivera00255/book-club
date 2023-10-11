import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const notice = await prisma.report.findMany();
  return NextResponse.json(notice);
};

export const POST = async (request: Request) => {
  try {
    const json = await request.json();

    const report = await prisma.report.create({
      data: json,
    });

    return new NextResponse(JSON.stringify(report), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
};
