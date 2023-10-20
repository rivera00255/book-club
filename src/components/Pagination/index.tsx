import styles from "./pagination.module.scss";
import usePagination from "../../hooks/usePagination";
import { Dispatch, SetStateAction, useEffect } from "react";
import { persist } from "@/utilities/persist";
import { useSelectedLayoutSegment } from "next/navigation";

const Pagination = ({
  limit,
  pageLimit,
  totalPage,
  currentPage,
  setCurrentPage,
  setFirstCount,
}: {
  limit: number;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  pageLimit: number;
  totalPage: number;
  setFirstCount?: Dispatch<SetStateAction<number>>;
}) => {
  const {
    currentPageBlock,
    setCurrentPageBlock,
    pageable,
    clickPage,
    prev,
    next,
    moveToFirst,
    moveToLast,
  } = usePagination({
    limit,
    pageLimit,
    totalPage,
    currentPage,
    setCurrentPage,
  });
  const segment = useSelectedLayoutSegment();

  useEffect(() => {
    if (segment?.includes("bookreport")) {
      if (persist.getSessionStorage("page")) {
        const saved = persist.getSessionStorage("page");
        setCurrentPage(saved.currentPage);
        setCurrentPageBlock(saved.currentPageBlock);
        setFirstCount && setFirstCount(saved.firstCount);
      }
    }
  }, [segment]);

  return (
    <div className={styles.page}>
      <button
        onClick={() => {
          moveToFirst();
          setFirstCount && setFirstCount(0);
        }}
        disabled={currentPage === 1 || currentPageBlock === 0}
      >
        &lt;&lt;
      </button>
      <button
        onClick={() => {
          prev();
          setFirstCount && setFirstCount((currentPage - 1) * limit - limit);
        }}
        disabled={
          currentPage === 1 || totalPage === 1 || currentPageBlock === 0
        }
      >
        &lt;
      </button>
      {pageable.length > 0 &&
        pageable.map((i) => (
          <button
            key={i}
            data-index={currentPage === i ? i : null}
            onClick={() => {
              clickPage(i);
              setFirstCount && setFirstCount((i - 1) * limit);
            }}
          >
            {i}
          </button>
        ))}
      <button
        onClick={() => {
          next();
          setFirstCount && setFirstCount(currentPage * limit);
        }}
        disabled={
          currentPage === totalPage ||
          totalPage <= 1 ||
          (currentPageBlock + 1) * pageLimit >= totalPage
        }
      >
        &gt;
      </button>
      <button
        onClick={() => {
          moveToLast();
          setFirstCount &&
            setFirstCount((currentPageBlock + 1) * pageLimit * limit);
        }}
        disabled={
          currentPage === totalPage ||
          Math.ceil(totalPage / pageLimit) <= 1 ||
          (currentPageBlock + 1) * pageLimit >= totalPage
        }
      >
        &gt;&gt;
      </button>
    </div>
  );
};

export default Pagination;
