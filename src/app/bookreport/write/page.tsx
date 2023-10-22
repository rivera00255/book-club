"use client";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";

const QuillEditor = dynamic(() => import("@/components/QuillEditor"), {
  loading: () => <div>loading...</div>,
  ssr: false,
});

const WriteReport = () => {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <main>
      <h2>독서 기록</h2>
      <QuillEditor user={user} />
    </main>
  );
};

export default WriteReport;
