import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "excel-to-json",
  description:
    "Welcome to the Excel to JSON Converter, a powerful internal tool designed to streamline the process of converting Excel files into JSON format. This tool simplifies data transformation, making it easy for users to extract valuable insights from their spreadsheet data.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} overflow-x-hidden`}>{children}</body>
    </html>
  );
}
