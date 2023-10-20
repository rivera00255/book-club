"use client";
import { BookReport } from "@/app/type";
import { useMemo, useState } from "react";
import ReportPreview from "../ReportPreview";
import Pagination from "../Pagination";
import styles from "./reportList.module.scss";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const ReportList = ({ reports }: { reports: BookReport[] }) => {
  const router = useRouter();
  const { data: session } = useSession();

  let limit = 10;
  let pageLimit = 10;
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [firstCount, setFirstCount] = useState(0);

  const bookreport = useMemo(() => {
    setTotalPage(Math.ceil(reports.length / limit));
    return reports.slice(firstCount, firstCount + limit);
  }, [firstCount, limit, reports]);

  return (
    <div className={styles.container}>
      <div>
        {bookreport.length > 0 &&
          bookreport.map((item) => <ReportPreview item={item} key={item.id} />)}
      </div>
      {totalPage > 1 && (
        <Pagination
          limit={limit}
          pageLimit={pageLimit}
          totalPage={totalPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setFirstCount={setFirstCount}
        />
      )}
      {session && (
        <div className={styles.buttonWrapper}>
          <button onClick={() => router.push("/bookreport/write")}>
            글 쓰기
          </button>
        </div>
      )}
    </div>
  );
};

export default ReportList;
