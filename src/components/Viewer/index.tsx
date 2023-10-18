"use client";
import { Viewer } from "@/lib/ToastEditor";

const ReportViewer = ({ report }: { report: string }) => {
  return <Viewer initialValue={report} />;
};

export default ReportViewer;
