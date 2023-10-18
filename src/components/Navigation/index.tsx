"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navigation = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const isView = status === "loading" ? "0" : "100%";

  if (status !== "loading")
    if (session) {
      return (
        <>
          <li>
            <Link href="/mypage">마이페이지</Link>
          </li>
          <li>
            <button
              onClick={() =>
                signOut({
                  callbackUrl: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}`,
                })
              }
            >
              로그아웃
            </button>
          </li>
        </>
      );
    }
  return (
    <li style={{ opacity: `${isView}` }}>
      <button onClick={() => signIn()}>로그인</button>
    </li>
  );
};

export default Navigation;
