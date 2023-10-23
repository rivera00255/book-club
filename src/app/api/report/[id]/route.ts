import { NextResponse } from "next/server";

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const id = Number(params.id);
  // const report = await prisma.report.findUnique({
  //   where: {
  //     id,
  //   },
  // });

  // if (!report) {
  //   return new NextResponse("Not found", { status: 404 });
  // }

  return NextResponse.json({});
  // return NextResponse.json(report);
};

export const PUT = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const id = Number(params.id);
  let json = await request.json();

  // const report = await prisma.report.findUnique({
  //   where: {
  //     id,
  //     authorId: json.authorId,
  //   },
  // });

  // if (!report) {
  //   return new NextResponse("Unauthorized", { status: 401 });
  // }

  // const updated = await prisma.report.update({
  //   where: { id },
  //   data: json,
  // });

  // if (!updated) {
  //   return new NextResponse("Not found", { status: 404 });
  // }

  // return NextResponse.json(updated);
  return NextResponse.json({});
};

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const id = Number(params.id);
    let json = await request.json();

    // const report = await prisma.report.findUnique({
    //   where: {
    //     id,
    //   },
    // });

    // if (!report) {
    //   return new NextResponse("Not found", { status: 404 });
    // }

    // if (report.authorId !== json.authorId) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }

    // await prisma.report.delete({
    //   where: { id },
    // });

    return new NextResponse(id.toString(), { status: 200 });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
};
