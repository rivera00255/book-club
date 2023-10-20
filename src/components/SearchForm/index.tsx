"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./search.module.scss";
import { queryFetch } from "@/utilities/fetcher";
import { Books } from "@/app/type";
import BookPreview from "../BookPreview";
import Pagination from "../Pagination";

const SearchForm = () => {
  const searchRef = useRef<HTMLInputElement>(null);
  const [searchType, setSearchType] = useState("title");
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState<{ [key: string]: Books }[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const searchBooks = async (type: string, search: string, pageNo: number) => {
    const response = await queryFetch(
      "GET",
      `/api/books/search?${type}=${search}&pageNo=${pageNo}`
    );
    setBooks(response.docs);
    setLoading(false);
    return response;
  };

  const onSearch = async () => {
    setLoading(true);
    setSearch("");
    setTotalCount(0);
    setCurrentPage(1);
    if (searchRef.current && searchRef.current.value !== "") {
      const searchStr = searchRef.current.value.trim().replaceAll(" ", "");
      setSearch(searchStr);
      const result = await searchBooks(searchType, searchStr, currentPage);
      setTotalCount(result.numFound);
    }
  };

  const handleEnterKey = (e: KeyboardEvent) => {
    if (e.code === "Enter") onSearch();
  };

  useEffect(() => {
    if (currentPage >= 1 && search !== "")
      searchBooks(searchType, search, currentPage);
  }, [currentPage]);

  return (
    <div className={styles.container}>
      <div>
        <select onChange={(e) => setSearchType(e.target.value)}>
          <option value="title">도서명</option>
          <option value="author">저자명</option>
        </select>
        <input
          type="text"
          ref={searchRef}
          onKeyUp={(e: any) => handleEnterKey(e)}
        />
        <button onClick={onSearch}>검색</button>
      </div>
      <div>
        <div className={styles.list}>
          {!loading && totalCount < 1 && <span>검색 결과가 없습니다.</span>}
          {books.length > 0 &&
            books.map((item: { [key: string]: Books }) => (
              <BookPreview item={item.doc} key={item.doc.isbn13} />
            ))}
        </div>
        <Pagination
          limit={20}
          pageLimit={10}
          totalPage={Math.ceil(totalCount / 20)}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default SearchForm;
