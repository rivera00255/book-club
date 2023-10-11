"use client";
import dynamic from "next/dynamic";

const ReportEditor = dynamic(() => import("@/components/Editor"), {
  loading: () => <div>loading...</div>,
  ssr: false,
});

const WriteReport = () => {
  return (
    <div>
      write report
      <ReportEditor />
    </div>
  );
};

export default WriteReport;
