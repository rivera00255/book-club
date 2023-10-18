"use client";
import styles from "./bookreport.module.scss";
import { queryFetch } from "@/utilities/fetcher";
import { useEffect, useState } from "react";
import { BookReport } from "../type";
import ReportPreview from "@/components/ReportPreview";
import Pagination from "@/components/Pagination";

const BookReport = () => {
  let limit = 10;
  let pageLimit = 10;
  // const [cursor, setCursor] = useState(0);
  const [reports, setReports] = useState<BookReport[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [skip, setSkip] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  // const handleCursor = (
  //   currentPage: number,
  //   totalCount: number,
  //   limit: number
  // ) => {
  //   if (currentPage === 1) {
  //     setCursor(totalCount);
  //     return;
  //   }
  //   setCursor(totalCount - currentPage + limit - 1);
  // };

  // const getReports = async (cursor: number) => {
  //   const response = await queryFetch(
  //     "GET",
  //     `/api/report?take=${limit}&cursor=${cursor}`
  //   );
  //   if (response) {
  //     setLoading(false);
  //     setReports(response.report);
  //     setTotalCount(response.totalCount);
  //     return response;
  //   }
  // };

  // useEffect(() => {
  //   handleCursor(currentPage, totalCount, limit);
  // }, [currentPage]);

  // useEffect(() => {
  //   getReports(cursor);
  // }, [cursor]);

  const handleSkip = (currentPage: number, limit: number) => {
    setSkip((currentPage - 1) * limit);
  };

  const getReports = async (skip: number) => {
    const response = await queryFetch(
      "GET",
      `/api/report?take=${limit}&skip=${skip}`
    );
    if (response) {
      setLoading(false);
      setReports(response.report);
      setTotalCount(response.totalCount);
      return response;
    }
  };

  useEffect(() => {
    handleSkip(currentPage, limit);
  }, [currentPage]);

  useEffect(() => {
    getReports(skip);
  }, [skip]);

  return (
    <main>
      <h2>독서 기록</h2>
      <div className={styles.container}>
        {loading && <div>loading...</div>}
        {reports.length > 0 &&
          reports.map((item) => <ReportPreview item={item} key={item.id} />)}
        {totalCount > 1 && (
          <Pagination
            pageLimit={pageLimit}
            totalPage={Math.ceil(totalCount / limit)}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </main>
  );
};

export default BookReport;
