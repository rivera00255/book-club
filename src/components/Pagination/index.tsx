import styles from "./pagination.module.scss";
import usePagination from "../../hooks/usePagination";
import { Dispatch, SetStateAction } from "react";

const Pagination = ({
  // limit,
  pageLimit,
  totalPage,
  currentPage,
  setCurrentPage,
}: {
  // limit: number;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  pageLimit: number;
  totalPage: number;
}) => {
  const {
    // currentPage,
    // setCurrentPage,
    currentPageBlock,
    setCurrentPageBlock,
    pageable,
    clickPage,
    prev,
    next,
    moveToFirst,
    moveToLast,
  } = usePagination({
    // limit,
    pageLimit,
    totalPage,
    currentPage,
    setCurrentPage,
  });

  // useEffect(() => {
  //   if (persist.getSessionStorage('page')) {
  //     const saved = persist.getSessionStorage('page');
  //     setCurrentPage(saved.currentPage);
  //     setCurrentPageBlock(saved.currentPageBlock);
  //     setFirstCount(saved.firstCount);
  //   }
  // }, []);

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
        disabled={currentPage === totalPage || totalPage <= 1}
      >
        &gt;
      </button>
      <button
        onClick={moveToLast}
        disabled={
          currentPage === totalPage || Math.ceil(totalPage / pageLimit) <= 1
        }
      >
        &gt;&gt;
      </button>
    </div>
  );
};

export default Pagination;
