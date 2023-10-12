import styles from "./pagination.module.scss";
import usePagination from "../../hooks/usePagination";
import { Dispatch, SetStateAction } from "react";

const Pagination = ({
  pageLimit,
  totalPage,
  currentPage,
  setCurrentPage,
}: {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  pageLimit: number;
  totalPage: number;
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
    pageLimit,
    totalPage,
    currentPage,
    setCurrentPage,
  });

  return (
    <div className={styles.page}>
      <button
        onClick={moveToFirst}
        disabled={currentPage === 1 || currentPageBlock === 0}
      >
        &lt;&lt;
      </button>
      <button onClick={prev} disabled={currentPage === 1 || totalPage === 1}>
        &lt;
      </button>
      {pageable.length > 1 &&
        pageable.map((i) => (
          <button
            key={i}
            data-index={currentPage === i ? i : null}
            onClick={() => clickPage(i)}
          >
            {i}
          </button>
        ))}
      <button
        onClick={next}
        disabled={
          currentPage === totalPage ||
          totalPage <= 1 ||
          (currentPageBlock + 1) * pageLimit >= totalPage
        }
      >
        &gt;
      </button>
      <button
        onClick={moveToLast}
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
