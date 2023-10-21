"use client";
import { useMemo, useRef } from "react";
import styles from "./editor.module.scss";
import { mutateFetch } from "@/utilities/fetcher";
import { useRouter } from "next/navigation";
import { BookReport } from "@/app/type";
import { useDispatch } from "react-redux";
import { create } from "@/store/slices/notifySlice";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

type User = {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
};

const QuillEditor = ({
  user,
  report,
}: {
  user: User | undefined;
  report?: BookReport;
}) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<ReactQuill>(null);
  const router = useRouter();
  const id = report?.id ?? 0;
  const dispatch = useDispatch();

  const onUploadImage = async () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.addEventListener("change", async () => {
      const file = input && input.files && input.files[0];
      if (file) {
        const editor = contentRef.current?.getEditor();
        const response = await fetch(`/api/file/upload?filename=${file.name}`, {
          method: "POST",
          headers: { "content-type": file.type || "application/octet-stream" },
          body: file,
        });
        const { url } = await response.json();
        const range = editor?.getSelection(true);
        editor?.insertEmbed(Number(range?.index), "image", url);
        // return new Promise((resolve, reject) => {
        //   resolve({ data: { link: url } });
        // });
      }
    });
  };

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          ["bold", "italic", "underline", "strike"],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ align: [] }],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ color: [] }, { background: [] }],
          ["blockquote", "code-block"],
          ["link", "image"],
        ],
        handlers: {
          image: onUploadImage,
        },
      },
    };
  }, []);

  const createReport = async (report: { [key: string]: any }) => {
    const response = await mutateFetch("POST", "/api/report", report);
    if (response) {
      router.refresh();
      router.push("../bookreport");
    }
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
      // const regex = /(?<=src=")(.*)(?=" alt)/g;
      const regex = /(?<=src=")(.*)(?=">)/g;
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
    if (response) {
      dispatch(create({ message: "글이 삭제되었습니다." }));
      router.refresh();
      router.replace("../");
    }
  };

  const onSubmit = (authorId: string | null | undefined) => {
    if (!authorId) return;
    if (titleRef.current && contentRef.current) {
      const title = titleRef.current.value;
      const content = contentRef.current.value as string;
      if (title !== "" && content.length > 0) {
        !report
          ? createReport({
              title: title,
              content: content,
              authorId: authorId,
            })
          : updateReport({
              ...report,
              title: title,
              content: content,
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
          <div>
            <ReactQuill
              theme="snow"
              style={{ width: "100%", height: "480px" }}
              modules={modules}
              defaultValue={report?.content || ""}
              ref={contentRef}
            />
          </div>
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

export default QuillEditor;
