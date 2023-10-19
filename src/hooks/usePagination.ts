import { Dispatch, SetStateAction, useState } from "react";

const usePagination = ({
  limit,
  currentPage,
  setCurrentPage,
  pageLimit,
  totalPage,
}: {
  limit: number;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  pageLimit: number;
  totalPage: number;
}) => {
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
    if (currentPageBlock < 1 || currentPageBlock === 0) return;
    setCurrentPage((currentPageBlock - 1) * pageLimit + 1);
    setCurrentPageBlock((prev) => prev - 1);
  };

  const next = () => {
    if ((currentPageBlock + 1) * pageLimit >= totalPage) return;
    setCurrentPage((currentPageBlock + 1) * pageLimit + 1);
    setCurrentPageBlock((prev) => prev + 1);
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
