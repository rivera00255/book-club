"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import styles from "./boardNav.module.scss";

const BoardNavigation = ({
  id,
  authorId,
}: {
  id: number;
  authorId: string;
}) => {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <div className={styles.container}>
      <button onClick={() => router.push("../bookreport")}>목록으로</button>
      {authorId === session?.user?.email && (
        <button onClick={() => router.push(`../bookreport/${id}/edit`)}>
          수정 / 삭제
        </button>
      )}
    </div>
  );
};

export default BoardNavigation;
