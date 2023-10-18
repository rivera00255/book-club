import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const DELETE = async (request: Request) => {
  try {
    const { email, password } = (await request.json()) as {
      email: string;
      password: string;
    };

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) throw new Error("Not Found");

    const verifyPassoword = await bcrypt.compare(password, user.password);

    if (!verifyPassoword) new NextResponse("Not Found", { status: 401 });

    await prisma.user.delete({
      where: {
        email: email,
      },
    });

    return new NextResponse(email, { status: 200 });
  } catch (error: any) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }
};
