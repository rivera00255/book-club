import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (request: Request) => {
  try {
    const { email, password } = (await request.json()) as {
      email: string;
      password: string;
    };

    const hashPassword = await bcrypt.hash(password, 10);

    // const user = await prisma.user.create({
    //   data: {
    //     email,
    //     password: hashPassword,
    //   },
    // });

    // return new NextResponse(
    //   JSON.stringify({
    //     user: { email: user.email, createdAt: user.createdAt },
    //   }),
    //   {
    //     status: 201,
    //     headers: { "Content-Type": "application/json" },
    //   }
    // );
    return new NextResponse(
      JSON.stringify({
        user: { email: "", createdAt: "" },
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
};
