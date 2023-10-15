"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Navigation = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <li>
          <Link href="/mypage">마이페이지</Link>
        </li>
        <li>
          <button onClick={() => signOut()}>로그아웃</button>
        </li>
      </>
    );
  }
  return (
    <li>
      <button onClick={() => signIn()}>로그인</button>
    </li>
  );
};

export default Navigation;
