import ReportList from "@/components/ReportList";
// import prisma from "@/lib/prisma";
import { sql } from "@vercel/postgres";

const BookReport = async () => {
  const client = await sql.connect();
  const { rows } = await client.sql`SELECT * FROM database`;
  console.log(rows);
  // const reports = await prisma.report.findMany({
  //   orderBy: [
  //     {
  //       createdAt: "desc",
  //     },
  //   ],
  // });

  return (
    <main>
      <h2>독서 기록</h2>
      {/* {reports && <ReportList reports={reports} />} */}
    </main>
  );
};

export default BookReport;
