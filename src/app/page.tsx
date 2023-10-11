import { queryFetch } from "@/utilities/fetcher";
import { Books } from "./type";
import Image from "next/image";
import sytles from "./main.module.scss";

export const dynamic = "force-dynamic";

const getDateString = (datetime: number) => {
  const date = new Date(datetime)
    .toLocaleDateString("ko-kr")
    .replaceAll(".", "")
    .split(" ");
  return `${date[0]}-${date[1].padStart(2, "0")}-${date[2].padStart(2, "0")}`;
};

const handlePeriod = () => {
  const day = 1000 * 60 * 60 * 24;
  const start = new Date().getTime() - day * 90;
  const end = new Date().getTime() - day;
  const startDate = getDateString(start);
  const endDate = getDateString(end);
  return `&startDt=${startDate}&endDt=${endDate}`;
};

export default async function Home() {
  const period = handlePeriod();
  const apiUrl = `${process.env.LIBRARY_URL}/loanItemSrch?authKey=${process.env.LIBRARY_AUTH_KEY}${period}&pageNo=1&pageSize=30&format=json`;
  const books = await queryFetch("GET", apiUrl);

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
