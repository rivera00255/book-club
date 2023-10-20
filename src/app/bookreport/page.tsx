import ReportList from "@/components/ReportList";
import prisma from "@/lib/prisma";

const BookReport = async () => {
  const reports = await prisma.report.findMany({
    orderBy: [
      {
        createdAt: "desc",
      },
    ],
  });

  return (
    <main>
      <h2>독서 기록</h2>
      {reports && <ReportList reports={reports} />}
    </main>
  );
};

export default BookReport;
