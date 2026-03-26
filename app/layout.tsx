import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "腸活チェック",
  description: "おすすめの入浴体験を提案する腸活チェックアプリ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
