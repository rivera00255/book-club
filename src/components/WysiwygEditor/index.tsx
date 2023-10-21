"use client";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from "react-draft-wysiwyg";
import { useEffect, useRef, useState } from "react";
import styles from "./editor.module.scss";
import { mutateFetch } from "@/utilities/fetcher";
import { useRouter } from "next/navigation";
import { BookReport } from "@/app/type";
import { useDispatch } from "react-redux";
import { create } from "@/store/slices/notifySlice";
import { ContentState, EditorState, convertToRaw } from "draft-js";
import htmlToDraft from "html-to-draftjs";
import daraftToHtml from "draftjs-to-html";

type User = {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
};

const WysiwygEditor = ({
  user,
  report,
}: {
  user: User | undefined;
  report?: BookReport;
}) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [htmlString, setHtmlString] = useState("");
  const router = useRouter();
  const id = report?.id ?? 0;
  const dispatch = useDispatch();

  const handleIniitalEditorState = (content: string) => {
    const blocksFromHtml = htmlToDraft(content);
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(
      contentBlocks,
      entityMap
    );
    const editorState = EditorState.createWithContent(contentState);
    const initialState = blocksFromHtml
      ? editorState
      : EditorState.createEmpty();
    setEditorState(initialState);
  };

  const onEditorStateChange = (state: EditorState) => {
    setEditorState(state);
    const rawContentState = daraftToHtml(
      convertToRaw(editorState.getCurrentContent())
    );
    setHtmlString(rawContentState);
  };

  const onUploadImage = async (file: Blob) => {
    const blob = await fetch(`/api/file/upload?filename=${file.name}`, {
      method: "POST",
      headers: { "content-type": file.type || "application/octet-stream" },
      body: file,
    });
    const { url } = await blob.json();
    return new Promise((resolve, reject) => {
      resolve({ data: { link: url } });
    });
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
    if (!authorId) return;
    if (titleRef.current) {
      const title = titleRef.current.value;
      const content = htmlString;
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
              content: content === "" ? report?.content : content,
            });
      } else {
        dispatch(create({ message: "제목과 내용을 입력하세요." }));
      }
    }
  };

  useEffect(() => {
    if (report && report.content) handleIniitalEditorState(report.content);
  }, [report]);

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
            <Editor
              placeholder="내용을 입력하세요."
              editorState={editorState}
              onEditorStateChange={onEditorStateChange}
              localization={{ locale: "ko" }}
              toolbar={{
                options: [
                  "inline",
                  "blockType",
                  "fontSize",
                  "list",
                  "textAlign",
                  "colorPicker",
                  "link",
                  "emoji",
                  "image",
                  "history",
                ],
                image: {
                  uploadCallback: onUploadImage,
                  previewImage: true,
                },
              }}
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

export default WysiwygEditor;
