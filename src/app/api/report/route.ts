import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (request: Request) => {
  const url = new URL(request.url);
  // const cursor = url.searchParams.get("cursor");
  const take = url.searchParams.get("take");
  const skip = url.searchParams.get("skip");
  // const lastId = Number(cursor);
  const authorId = url.searchParams.get("authorId");

  if (authorId) {
    const count = await prisma.report.count({
      where: {
        authorId,
      },
    });

    const report = await prisma.report.findMany({
      where: {
        authorId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: Number(take),
      skip: Number(skip),
    });

    return NextResponse.json({
      report: report,
      totalCount: count,
    });
  }

  const count = await prisma.report.count();

  const report = await prisma.report.findMany({
    orderBy: [
      {
        createdAt: "desc",
      },
    ],
    take: Number(take),
    skip: Number(skip),
  });

  // const report = await prisma.report.findMany({
  //   orderBy: [
  //     {
  //       createdAt: "desc",
  //     },
  //   ],
  //   take: Number(take),
  //   skip: lastId ? 1 : 0,
  //   ...(lastId && { cursor: { id: lastId } }),
  // });

  // return NextResponse.json({
  //   report: report,
  //   totalCount: count,
  //   cursor: report[0].id,
  // });
  return NextResponse.json({
    report: report,
    totalCount: count,
  });
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
