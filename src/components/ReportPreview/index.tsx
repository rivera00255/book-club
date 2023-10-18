"use client";
import { BookReport } from "@/app/type";
import styles from "./reports.module.scss";
import Link from "next/link";
import { useEffect, useState } from "react";

const ReportPreview = ({ item }: { item: BookReport }) => {
  const [datetime, setDatetime] = useState<string>();
  const date = new Date(item.createdAt).getTime();

  const handleDatetime = (now: number, date: number) => {
    const day = 1000 * 60 * 60 * 24;
    const hour = 1000 * 60 * 60;
    const min = 1000 * 60;
    if (now - date >= day) {
      return new Date(date).toLocaleDateString("ko-kr");
    } else {
      if (now - date < min) return "방금 전";
      if (now - date < hour) return `${Math.round((now - date) / min)}분 전`;
      if (now - date < day) return `${Math.round((now - date) / hour)}시간 전`;
    }
  };

  useEffect(() => {
    const now = new Date().getTime();
    setDatetime(handleDatetime(now, date));
  }, [date]);

  return (
    <div className={styles.reports}>
      <Link href={`../bookreport/${item.id}`}>
        <p>{item.title}</p>
        <p>{datetime}</p>
      </Link>
    </div>
  );
};

export default ReportPreview;
