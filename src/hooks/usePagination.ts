import { Dispatch, SetStateAction, useState } from "react";

const usePagination = ({
  currentPage,
  setCurrentPage,
  pageLimit,
  totalPage,
}: {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  pageLimit: number;
  totalPage: number;
}) => {
  // const [currentPage, setCurrentPage] = useState(1);
  const [currentPageBlock, setCurrentPageBlock] = useState(0);

  const pageOffset = currentPageBlock * pageLimit;

  const handlePageBlock = (totalPage: number) => {
    const pageArr: number[] = [];
    for (let i = 0; i < totalPage; i++) pageArr.push(i + 1);
    return pageArr;
  };

  let pageable = handlePageBlock(totalPage).slice(
    pageOffset,
    pageOffset + pageLimit
  );

  const clickPage = (i: number) => {
    setCurrentPage(i);
  };

  const prev = () => {
    if (currentPage <= 1) return;
    if (currentPage - 1 <= pageLimit * currentPageBlock)
      setCurrentPageBlock((prev) => prev - 1);
    setCurrentPage((page) => page - 1);
  };

  const next = () => {
    if (currentPage >= totalPage) return;
    if (pageLimit * (currentPageBlock + 1) < currentPage + 1)
      setCurrentPageBlock((prev) => prev + 1);
    setCurrentPage((page) => page + 1);
  };

  const moveToFirst = () => {
    setCurrentPage(1);
    setCurrentPageBlock(0);
  };

  const moveToLast = () => {
    setCurrentPage(totalPage);
    setCurrentPageBlock(Math.ceil(totalPage / pageLimit) - 1);
  };

  return {
    currentPage,
    setCurrentPage,
    currentPageBlock,
    setCurrentPageBlock,
    pageable,
    clickPage,
    prev,
    next,
    moveToFirst,
    moveToLast,
  };
};

export default usePagination;
