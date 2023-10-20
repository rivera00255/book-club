import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@/lib/ToastEditor";
import { useRef } from "react";
import styles from "./editor.module.scss";
import { mutateFetch } from "@/utilities/fetcher";
import { useRouter } from "next/navigation";
import { BookReport } from "@/app/type";
import { useDispatch } from "react-redux";
import { create } from "@/store/slices/notifySlice";

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
  const dispatch = useDispatch();

  const onUploadImage = async (blob: Blob, callback: Function) => {
    const response = await fetch(`/api/file/upload?filename=${blob.name}`, {
      method: "POST",
      headers: { "content-type": blob.type || "application/octet-stream" },
      body: blob,
    });
    const { url } = await response.json();
    callback(url, blob.name);
  };

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
      dispatch(create({ message: "수정 완료되었습니다." }));
      router.refresh();
      router.replace(`../${report.id}`);
    }
  };

  const deleteImage = async (content: string) => {
    if (content) {
      const regex = /(?<=src=")(.*)(?=" alt)/g;
      const images = content.match(regex);
      if (!images) return;
      images.forEach(async (url) => {
        const response = await fetch(`/api/file/delete?url=${url}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/octet-stream" },
        });
      });
    }
  };

  const deleteReport = async (report: BookReport) => {
    report.content && deleteImage(report.content);
    const authorId = user?.email;
    const response = await mutateFetch("DELETE", `/api/report/${report.id}`, {
      authorId: user?.email,
    });
    if (response.status === 200) {
      dispatch(create({ message: "글이 삭제되었습니다." }));
      router.replace("../");
    }
  };

  const onSubmit = (authorId: string | null | undefined) => {
    if (authorId) return;
    if (titleRef.current && reportRef.current) {
      const title = titleRef.current.value;
      const content = reportRef.current?.getInstance();
      if (title !== "" && content.getMarkdown().length > 0) {
        !report
          ? createReport({
              title: title,
              content: content.getHTML(),
              authorId: authorId,
            })
          : updateReport({
              ...report,
              title: title,
              content: content.getHTML(),
            });
      } else {
        dispatch(create({ message: "제목과 내용을 입력하세요." }));
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
            hooks={{
              addImageBlobHook: onUploadImage,
            }}
          />
        </div>
        <div className={styles.buttonWrapper}>
          <button onClick={() => onSubmit(user?.email)}>
            {!report ? "작성하기" : "수정하기"}
          </button>
          {report && (
            <button
              onClick={() => {
                if (confirm("정말 삭제하시겠습니까?")) deleteReport(report);
              }}
            >
              삭제
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportEditor;
