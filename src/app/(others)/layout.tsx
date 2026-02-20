import { Inter } from "next/font/google";
import "../globals.css";

// Inter
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function OtherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz">
      <body className={`${inter.variable} antialiased`}>
        <main>{children}</main>
      </body>
    </html>
  );
}
