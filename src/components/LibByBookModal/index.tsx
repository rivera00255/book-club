import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Dimmed from "../Dimmed";
import styles from "./libModal.module.scss";
import { regions } from "@/app/api/books/library/route";
import { queryFetch } from "@/utilities/fetcher";
import { Lib } from "@/app/type";
import Pagination from "../Pagination";
import Link from "next/link";

const LibByBookModal = ({
  isbn,
  setIsOpenModal,
}: {
  isbn: string;
  setIsOpenModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [regionCode, setRegionCode] = useState(11);
  const [librarys, setLibrarys] = useState<{ lib: Lib }[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const searchLibByBook = async (
    isbn: string,
    region: number,
    pageNo: number
  ) => {
    const response = await queryFetch(
      "GET",
      `/api/books/library?isbn=${isbn}&region=${region}&pageNo=${pageNo}`
    );
    if (response) {
      setLibrarys(response.libs);
      setTotalCount(response.numFound);
      return response;
    }
  };

  useEffect(() => {
    if (currentPage >= 1 && librarys.length > 0)
      searchLibByBook(isbn, regionCode, currentPage);
  }, [currentPage]);

  return (
    <Dimmed modalRef={modalRef} setIsOpenModal={setIsOpenModal}>
      <div className={styles.modal}>
        <span>
          <h4>지역 선택</h4>
          <select onChange={(e) => setRegionCode(Number(e.target.value))}>
            {regions.map((item) => (
              <option key={item.code} value={item.code}>
                {item.name}
              </option>
            ))}
          </select>
          <button
            onClick={() => {
              setCurrentPage(1);
              setTotalCount(0);
              searchLibByBook(isbn, regionCode, currentPage);
            }}
          >
            찾기
          </button>
        </span>
        <div>
          {librarys.length > 0 && (
            <table>
              <thead>
                <tr>
                  <td>도서관명</td>
                  <td>주소</td>
                  <td>홈페이지</td>
                </tr>
              </thead>
              <tbody>
                {librarys.map((item) => (
                  <tr key={item.lib.libCode}>
                    <td>{item.lib.libName}</td>
                    <td>{item.lib.address}</td>
                    <td>
                      <Link href={item.lib.homepage} target="_blank">
                        {item.lib.homepage}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {totalCount > 1 && (
            <Pagination
              pageLimit={10}
              totalPage={Math.ceil(totalCount / 10)}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
        </div>
      </div>
    </Dimmed>
  );
};

export default LibByBookModal;
