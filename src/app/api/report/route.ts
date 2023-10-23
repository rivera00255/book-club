import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (request: Request) => {
  const url = new URL(request.url);
  const take = url.searchParams.get("take");
  const skip = url.searchParams.get("skip");
  const authorId = url.searchParams.get("authorId");

  // if (authorId) {
  //   const count = await prisma.report.count({
  //     where: {
  //       authorId,
  //     },
  //   });

  //   const report = await prisma.report.findMany({
  //     where: {
  //       authorId,
  //     },
  //     orderBy: {
  //       createdAt: "desc",
  //     },
  //     take: Number(take),
  //     skip: Number(skip),
  //   });

  //   return NextResponse.json({
  //     report: report,
  //     totalCount: count,
  //   });
  // }

  // const count = await prisma.report.count();

  // const report = await prisma.report.findMany({
  //   orderBy: [
  //     {
  //       createdAt: "desc",
  //     },
  //   ],
  //   ...(take && { take: Number(take) }),
  //   ...(skip && { skip: Number(skip) }),
  // });

  return NextResponse.json({
    report: [],
    totalCount: 0,
  });
  // return NextResponse.json({
  //   report: report,
  //   totalCount: count,
  // });
};

export const POST = async (request: Request) => {
  try {
    const json = await request.json();

    // const report = await prisma.report.create({
    //   data: json,
    // });

    return new NextResponse(JSON.stringify({}), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
    // return new NextResponse(JSON.stringify(report), {
    //   status: 201,
    //   headers: { "Content-Type": "application/json" },
    // });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
};
