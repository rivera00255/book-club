import { Books } from "@/app/type";
import styles from "./preview.module.scss";
import Image from "next/image";
import { useState } from "react";
import BookModal from "../BookModal";
import { queryFetch } from "@/utilities/fetcher";
import LibByBookModal from "../LibByBookModal";

const BookPreview = ({ item }: { item: Books }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenLibModal, setIsOpenLibModal] = useState(false);
  const [bookDetail, setBookDetail] = useState<Books>();

  const getBookDetail = async (isbn: string) => {
    const response = await queryFetch("GET", `/api/books?isbn=${isbn}`);
    if (response) setBookDetail(response.detail[0].book);
  };

  return (
    <div className={styles.container}>
      {isOpenModal && bookDetail && (
        <BookModal setIsOpenModal={setIsOpenModal} item={bookDetail} />
      )}
      {isOpenLibModal && (
        <LibByBookModal setIsOpenModal={setIsOpenLibModal} isbn={item.isbn13} />
      )}
      <div>
        <div className={styles.thumbnail}>
          {item.bookImageURL !== "" && (
            <Image
              src={item.bookImageURL}
              alt={item.bookname}
              fill
              sizes="(max-width: 768px) 100%, 50%"
            />
          )}
        </div>
        <div>
          <p>
            <strong>{item.bookname}</strong>&nbsp;
            {item.vol !== "" && <b>{item.vol}</b>}
          </p>
          <span>
            <p>{item.authors} </p>
            <p>
              {item.publisher} ({item.publication_year})
            </p>
          </span>
        </div>
      </div>
      <div className={styles.buttonWrapper}>
        <button
          onClick={() => {
            setIsOpenModal(true);
            getBookDetail(item.isbn13);
          }}
        >
          상세 정보 보기
        </button>
        <button onClick={() => setIsOpenLibModal(true)}>
          소장 도서관 찾기
        </button>
      </div>
    </div>
  );
};

export default BookPreview;
