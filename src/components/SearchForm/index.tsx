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
  // console.log(books);

  const searchBooks = async (type: string, search: string, pageNo: number) => {
    const response = await queryFetch(
      "GET",
      `/api/books/search?${type}=${search}&pageNo=${pageNo}`
    );
    setBooks(response.docs);
    return response;
  };

  const onSearch = async () => {
    setSearch("");
    setTotalCount(0);
    setCurrentPage(1);
    if (searchRef.current && searchRef.current.value !== "") {
      const searchStr = searchRef.current.value;
      setSearch(searchStr);
      const result = await searchBooks(searchType, searchStr, currentPage);
      setTotalCount(result.numFound);
    }
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
        <input type="text" ref={searchRef} />
        <button onClick={onSearch}>검색</button>
      </div>
      <div>
        {books.length > 0 &&
          books.map((item: { [key: string]: Books }) => (
            <BookPreview item={item.doc} key={item.doc.isbn13} />
          ))}
        {totalCount > 1 && (
          <Pagination
            pageLimit={10}
            totalPage={Math.ceil(totalCount / 20)}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};

export default SearchForm;
