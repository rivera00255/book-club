"use client";
import { useSelectedLayoutSegment } from "next/navigation";
import Footer from "../Footer";
import Header from "../Header";
import AuthProvider from "@/lib/AuthProvider";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Notifications from "../Notifications";

const MultipleLayout = ({ children }: { children: React.ReactNode }) => {
  // const currentFile = __filename;
  // console.log(currentFile.split(".next/server/app")[1]);
  const segment = useSelectedLayoutSegment();
  const notification = useSelector((state: RootState) => state.notify);

  if (segment === "signin")
    return (
      <AuthProvider>
        {notification.isNotify && <Notifications />}
        {children}
      </AuthProvider>
    );
  return (
    <AuthProvider>
      <Header />
      {notification.isNotify && <Notifications />}
      {children}
      <Footer />
    </AuthProvider>
  );
};

export default MultipleLayout;
