import ReportViewer from "@/components/Viewer";
import prisma from "@/lib/prisma";
import styles from "./report.module.scss";
import BoardNavigation from "@/components/BoardNavigation";

const Reports = async ({ params }: { params: { id: string } }) => {
  const id = Number(params.id);

  const report = await prisma.report.findUnique({
    where: {
      id,
    },
  });

  if (report)
    return (
      <main>
        <div className={styles.container}>
          <h4>{report.title}</h4>
          <hr />
          <div>
            <ReportViewer report={report.content ?? ""} />
            <span>
              <p>{report.createdAt.toLocaleDateString("ko-kr")}</p>
              <p>{report.authorId}</p>
            </span>
          </div>
        </div>
        <div className={styles.option}>
          <BoardNavigation id={id} authorId={report.authorId} />
        </div>
      </main>
    );
};

export default Reports;
