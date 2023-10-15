"use client";
import { useSelectedLayoutSegment } from "next/navigation";
import Footer from "../Footer";
import Header from "../Header";
import AuthProvider from "@/lib/AuthProvider";

const MultipleLayout = ({ children }: { children: React.ReactNode }) => {
  // const currentFile = __filename;
  // console.log(currentFile.split(".next/server/app")[1]);
  const segment = useSelectedLayoutSegment();

  if (segment === "signin") return <AuthProvider>{children}</AuthProvider>;
  return (
    <AuthProvider>
      <Header />
      {children}
      <Footer />
    </AuthProvider>
  );
};

export default MultipleLayout;
