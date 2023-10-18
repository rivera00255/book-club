"use client";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";

const ReportEditor = dynamic(() => import("@/components/Editor"), {
  loading: () => <div>loading...</div>,
  ssr: false,
});

const WriteReport = () => {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <main>
      <h2>독서 기록</h2>
      <ReportEditor user={user} />
    </main>
  );
};

export default WriteReport;
