import { Books } from "@/app/type";
import styles from "./preview.module.scss";
import Image from "next/image";

const BookPreview = ({ item }: { item: Books }) => {
  return (
    <div className={styles.container}>
      <div>
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
          <p>{item.authors} </p>&nbsp;
          <p>
            {item.publisher} ({item.publication_year})
          </p>
        </span>
      </div>
    </div>
  );
};

export default BookPreview;
