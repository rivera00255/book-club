"use client";
import { useSelectedLayoutSegment } from "next/navigation";
import Footer from "../Footer";
import Header from "../Header";
import AuthProvider from "@/lib/AuthProvider";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Notifications from "../Notifications";
import { useEffect } from "react";

const MultipleLayout = ({ children }: { children: React.ReactNode }) => {
  const segment = useSelectedLayoutSegment();
  const notification = useSelector((state: RootState) => state.notify);

  useEffect(() => {
    if (!segment?.includes("bookreport")) {
      sessionStorage.removeItem("page");
    }
  }, [segment]);

  if (segment === "signin")
    return (
      <>
        {notification.isNotify && <Notifications />}
        {children}
      </>
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
