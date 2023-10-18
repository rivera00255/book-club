"use client";
import { useSession } from "next-auth/react";
import styles from "./mypage.module.scss";
import { useEffect, useState } from "react";
import VerifyUserModal from "@/components/VerifyUserModal";
import { useRouter } from "next/navigation";
import { mutateFetch } from "@/utilities/fetcher";
import { BookReport } from "../type";
import ReportPreview from "@/components/ReportPreview";
import Pagination from "@/components/Pagination";

const MyPage = () => {
  const { data: session } = useSession();
  const userEmail = session?.user?.email;
  const [isVerifyrModalOpen, setIsVerifyModalOpen] = useState(false);
  const router = useRouter();

  let limit = 5;
  let pageLimit = 5;
  const [reports, setReports] = useState<BookReport[]>([]);
  const [skip, setSkip] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const getReportByUser = async (authorId: string, skip: number) => {
    const response = await mutateFetch(
      "GET",
      `/api/report?authorId=${authorId}&take=${limit}&skip=${skip}`
    );
    if (response) {
      setReports(response.report);
      setTotalCount(response.totalCount);
    }
  };

  const handleSkip = (currentPage: number, limit: number) => {
    setSkip((currentPage - 1) * limit);
  };

  useEffect(() => {
    handleSkip(currentPage, limit);
  }, [currentPage]);

  useEffect(() => {
    userEmail && getReportByUser(userEmail, skip);
  }, [skip]);

  return (
    <main>
      <h2>마이페이지</h2>
      <div className={styles.articles}>
        {isVerifyrModalOpen && (
          <VerifyUserModal
            setIsOpenModal={setIsVerifyModalOpen}
            email={userEmail}
          />
        )}
        <article>
          <h3>나의 독서 기록</h3>
          <div>
            {reports.length > 0 &&
              reports.map((item) => (
                <ReportPreview item={item} key={item.id} />
              ))}
            {totalCount > 1 && (
              <Pagination
                pageLimit={pageLimit}
                totalPage={Math.ceil(totalCount / limit)}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            )}
          </div>
        </article>
        <div>
          <button onClick={() => router.push("/bookreport/write")}>
            독서 기록 남기기
          </button>
        </div>
        <button onClick={() => setIsVerifyModalOpen(true)}>회원 탈퇴</button>
      </div>
    </main>
  );
};

export default MyPage;
