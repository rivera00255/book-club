import { queryFetch } from "@/utilities/fetcher";
import { Books } from "./type";
import Image from "next/image";
import sytles from "./main.module.scss";
import { handlePeriod } from "@/utilities/calculate";

export default async function Home() {
  const books = await queryFetch(
    "GET",
    `${process.env.NEXT_PUBLIC_LIBRARY_URL}/loanItemSrch?authKey=${
      process.env.NEXT_PUBLIC_LIBRARY_AUTH_KEY
    }${handlePeriod()}&pageNo=1&pageSize=30&format=json`
  );

  return (
    <main>
      <h2>인기 대출 도서 Top 30</h2>
      <div className={sytles.contentWrapper}>
        {books?.response.docs.map((item: { [key: string]: Books }) => (
          <div key={item.doc.isbn13}>
            <div>{item.doc.ranking}</div>
            <span>
              <Image
                src={item.doc.bookImageURL}
                alt={item.doc.bookname}
                fill
                sizes="(max-width: 768px) 100%, 50%"
                priority
              />
            </span>
            <p>
              <strong>
                {item.doc.bookname}&nbsp;{item.doc.vol !== "" && item.doc.vol}
              </strong>
            </p>
            <p>{item.doc.authors.replace("지은이: ", "")}</p>
            <p>{item.doc.publisher}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
