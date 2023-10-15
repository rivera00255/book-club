import "./globals.css";
import "./common.css";
import type { Metadata } from "next";
import MultipleLayout from "@/components/MultipleLayout";

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
        <MultipleLayout>{children}</MultipleLayout>
      </body>
    </html>
  );
}
