import prisma from "@/lib/prisma";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "이메일",
          type: "text",
          placeholder: "이메일을 입력하세요.",
        },
        password: {
          label: "비밀번호",
          type: "password",
          placeholder: "비밀번호를 입력하세요.",
        },
      },
      async authorize(credentials, req) {
        if (!credentials) throw new Error("SignIn Error");

        const { email, password } = credentials;

        const user = await prisma.user.findUnique({
          where: {
            email: email,
          },
        });

        if (!user)
          throw new Error(
            "가입 내역이 없습니다. 회원가입 후 로그인해해주세요."
          );

        const matchesPassword = await bcrypt.compare(password, user.password);

        if (!matchesPassword)
          throw new Error("정확한 비밀번호를 입력해주세요.");

        return { id: user.email };
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
