"use client";
import { BookReport } from "@/app/type";
import { queryFetch } from "@/utilities/fetcher";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const ReportEditor = dynamic(() => import("@/components/Editor"), {
  loading: () => <div>loading...</div>,
  ssr: false,
});

const EditReport = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const param = useParams();

  const [report, setReport] = useState<BookReport | null>(null);

  const getReport = async () => {
    const response = await queryFetch("GET", `/api/report/${param.id}`);
    setReport(response);
  };

  useEffect(() => {
    getReport();
  }, []);

  return (
    <main>
      <h2>독서 기록</h2>
      {report && <ReportEditor user={user} report={report} />}
    </main>
  );
};

export default EditReport;
