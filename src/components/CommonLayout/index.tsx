"use client";
import { Provider } from "react-redux";
import store from "@/store";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default CommonLayout;
