import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@/lib/ToastEditor";
import { useRef } from "react";
import styles from "./editor.module.scss";
import { mutateFetch } from "@/utilities/fetcher";
import { useRouter } from "next/navigation";
import { BookReport } from "@/app/type";

type User = {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
};

const ReportEditor = ({
  user,
  report,
}: {
  user: User | undefined;
  report?: BookReport;
}) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const reportRef = useRef<Editor>(null);
  const router = useRouter();
  const id = report?.id ?? 0;

  const createReport = async (report: { [key: string]: any }) => {
    const response = await mutateFetch("POST", "/api/report", report);
    if (response) router.push("../bookreport");
  };

  const updateReport = async (report: BookReport) => {
    const response = await mutateFetch(
      "PUT",
      `/api/report/${report.id}`,
      report
    );
    if (response) {
      router.refresh();
      router.replace(`../${report.id}`);
    }
  };

  const deleteReport = async (id: number) => {
    const authorId = user?.email;
    const response = await mutateFetch("DELETE", `/api/report/${id}`, {
      authorId: user?.email,
    });
    console.log(response);
    if (response) router.replace("../");
  };

  const onSubmit = () => {
    if (titleRef.current && reportRef.current) {
      const title = titleRef.current.value;
      const content = reportRef.current?.getInstance();
      if (title !== "" && content.getMarkdown().length > 0) {
        !report
          ? createReport({
              title: title,
              content: content.getHTML(),
              authorId: user?.email,
            })
          : updateReport({
              ...report,
              title: title,
              content: content.getHTML(),
            });
      } else {
        alert("제목과 내용을 입력하세요.");
      }
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.editor}>
          <input
            type="text"
            placeholder="제목을 입력하세요."
            ref={titleRef}
            defaultValue={report?.title}
          />
          <Editor
            initialValue={report?.content || "내용을 입력하세요."}
            previewStyle="vertical"
            height="480px"
            initialEditType={!report ? "markdown" : "wysiwyg"}
            language="ko-KR"
            toolbarItems={[
              ["heading", "bold", "italic", "strike"],
              ["hr", "quote"],
              ["link", "image"],
            ]}
            useCommandShortcut={true}
            usageStatistics={false}
            ref={reportRef}
          />
        </div>
        <button onClick={onSubmit}>{!report ? "작성하기" : "수정하기"}</button>
        {report && (
          <button
            onClick={() => {
              if (confirm("정말 삭제하시겠습니까?")) deleteReport(id);
            }}
          >
            삭제
          </button>
        )}
      </div>
    </div>
  );
};

export default ReportEditor;
