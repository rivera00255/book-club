import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Dimmed from "../Dimmed";
import styles from "./libModal.module.scss";
import { queryFetch } from "@/utilities/fetcher";
import { Lib } from "@/app/type";
import Pagination from "../Pagination";
import Link from "next/link";

const regions = [
  { code: 11, name: "서울" },
  { code: 21, name: "부산" },
  { code: 22, name: "대구" },
  { code: 23, name: "인천" },
  { code: 24, name: "광주" },
  { code: 25, name: "대전" },
  { code: 26, name: "울산" },
  { code: 29, name: "세종" },
  { code: 31, name: "경기" },
  { code: 32, name: "강원" },
  { code: 33, name: "충북" },
  { code: 34, name: "충남" },
  { code: 35, name: "전북" },
  { code: 36, name: "전남" },
  { code: 37, name: "경북" },
  { code: 38, name: "경남" },
  { code: 39, name: "제주" },
];

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
                    <td>
                      <Link href={item.lib.homepage} target="_blank">
                        {item.lib.libName}
                      </Link>
                    </td>
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
              limit={10}
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
