import Link from "next/link";
import styles from "./header.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <nav>
        <h1>
          <Link href="/">BookClub</Link>
        </h1>
        <ul>
          <li>
            <Link href="/search">도서검색</Link>
          </li>
          <li>
            <Link href="/bookreport">독서기록</Link>
          </li>
          {/* <li>
            <Link href="/">마이페이지</Link>
          </li> */}
        </ul>
        <button>로그인</button>
      </nav>
    </header>
  );
};

export default Header;
