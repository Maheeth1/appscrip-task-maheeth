import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  title: "Discover Our Products — Appscrip Task",
  description: "A responsive product listing page built with Next.js and FakeStore API",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} app-root`}>
        {children}
      </body>
    </html>
  );
}
