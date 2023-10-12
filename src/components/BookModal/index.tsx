import { Dispatch, SetStateAction, useRef, useState } from "react";
import Dimmed from "../Dimmed";
import styles from "./bookModal.module.scss";
import { Books } from "@/app/type";
import Image from "next/image";

const BookModal = ({
  setIsOpenModal,
  item,
}: {
  setIsOpenModal: Dispatch<SetStateAction<boolean>>;
  item: Books;
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  return (
    <Dimmed modalRef={modalRef} setIsOpenModal={setIsOpenModal}>
      <div className={styles.modal}>
        <div className={styles.image}>
          <Image
            src={item.bookImageURL}
            alt={item.bookname}
            fill
            sizes="(max-width: 768px) 80%, 100%"
          />
        </div>
        <div className={styles.text}>
          <p>
            <strong>{item.bookname}</strong>
          </p>
          <hr />
          <div>
            <p>{item.authors} </p>
            <p>
              {item.publisher} ({item.publication_year})
            </p>
          </div>
          <p>{item.description}</p>
        </div>
      </div>
    </Dimmed>
  );
};

export default BookModal;
