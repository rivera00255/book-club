import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@/lib/ToastEditor";

const ReportEditor = () => {
  return (
    <Editor
      initialValue="hello react editor world!"
      previewStyle="vertical"
      height="600px"
      initialEditType="markdown"
      useCommandShortcut={true}
    />
  );
};

export default ReportEditor;
