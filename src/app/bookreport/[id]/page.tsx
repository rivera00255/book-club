import styles from "./report.module.scss";
import BoardNavigation from "@/components/BoardNavigation";
import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";

const BookReport = async ({ params }: { params: { id: string } }) => {
  const id = Number(params.id);

  // const report = await prisma.report.findUnique({
  //   where: {
  //     id,
  //   },
  // });

  return <main>{id}</main>;
  // if (report)
  //   return (
  //     <main>
  //       <div className={styles.container}>
  //         <h4>{report.title}</h4>
  //         <hr />
  //         <div>
  //           <div
  //             dangerouslySetInnerHTML={{
  //               __html: DOMPurify(new JSDOM("<!DOCTYPE html>").window).sanitize(
  //                 report.content ?? ""
  //               ),
  //             }}
  //           />
  //           <span>
  //             <p>{report.createdAt.toLocaleDateString("ko-kr")}</p>
  //             <p>{report.authorId}</p>
  //           </span>
  //         </div>
  //       </div>
  //       <div className={styles.option}>
  //         <BoardNavigation id={id} authorId={report.authorId} />
  //       </div>
  //     </main>
  //   );
};

export default BookReport;
