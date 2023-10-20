import { persist } from "@/utilities/persist";
import { Dispatch, SetStateAction, useState } from "react";

const usePagination = ({
  limit,
  pageLimit,
  currentPage,
  setCurrentPage,
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

  const savedPage =
    typeof window !== "undefined" && persist.getSessionStorage("page");

  const saveCurrentPage = (
    currentPage: number,
    currentPageBlock: number,
    firstCount: number
  ) => {
    persist.setSessionStorage("page", {
      currentPage,
      currentPageBlock,
      firstCount,
    });
  };

  const clickPage = (i: number) => {
    setCurrentPage(i);
    saveCurrentPage(i, currentPageBlock, (i - 1) * limit);
  };

  const prev = () => {
    if (currentPageBlock < 1 || currentPageBlock === 0) return;
    setCurrentPage((currentPageBlock - 1) * pageLimit + 1);
    setCurrentPageBlock((prev) => prev - 1);
    saveCurrentPage(
      currentPage - 1,
      currentPageBlock,
      (currentPage - 1) * limit - limit
    );
  };

  const next = () => {
    if ((currentPageBlock + 1) * pageLimit >= totalPage) return;
    setCurrentPage((currentPageBlock + 1) * pageLimit + 1);
    setCurrentPageBlock((prev) => prev + 1);
    saveCurrentPage(currentPage + 1, currentPageBlock, currentPage * limit);
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
