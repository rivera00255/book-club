import Link from "next/link";
import styles from "./header.module.scss";
import { signIn } from "next-auth/react";
import Navigation from "../Navigation";

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
          <Navigation />
        </ul>
      </nav>
    </header>
  );
};

export default Header;
