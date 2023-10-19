import "./globals.css";
import "./common.css";
import type { Metadata } from "next";
import MultipleLayout from "@/components/MultipleLayout";
import CommonLayout from "@/components/CommonLayout";

export const metadata: Metadata = {
  title: "Book Club",
  description: "What do you want to read?",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CommonLayout>
          <MultipleLayout>{children}</MultipleLayout>
        </CommonLayout>
      </body>
    </html>
  );
}
