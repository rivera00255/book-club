import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@/lib/ToastEditor";
import { useRef } from "react";
import styles from "./editor.module.scss";

const ReportEditor = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const authorRef = useRef<HTMLInputElement>(null);
  const publisherRef = useRef<HTMLInputElement>(null);
  const reportRef = useRef<Editor>(null);

  return (
    <div className={styles.container}>
      <div>
        <div>
          <label>
            <p>책 제목</p>
            <input type="text" ref={titleRef} />
          </label>
          <label>
            <p>저 자</p>
            <input type="text" ref={authorRef} />
          </label>
          <label>
            <p>출판사</p>
            <input type="text" ref={publisherRef} />
          </label>
        </div>
        <div className={styles.editor}>
          <input type="text" placeholder="제목을 입력하세요." />
          <Editor
            initialValue="내용을 입력하세요."
            previewStyle="vertical"
            height="480px"
            initialEditType="markdown"
            language="ko-KR"
            toolbarItems={[
              ["heading", "bold", "italic", "strike"],
              ["hr", "quote"],
              ["link"],
            ]}
            useCommandShortcut={true}
            usageStatistics={false}
            ref={reportRef}
          />
        </div>
        <button>글 쓰기</button>
      </div>
    </div>
  );
};

export default ReportEditor;
