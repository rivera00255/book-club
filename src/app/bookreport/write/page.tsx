"use client";
import dynamic from "next/dynamic";

const ReportEditor = dynamic(() => import("@/components/Editor"), {
  loading: () => <div>loading...</div>,
  ssr: false,
});

const WriteReport = () => {
  return (
    <main>
      <h2>독서 기록</h2>
      <ReportEditor />
    </main>
  );
};

export default WriteReport;
