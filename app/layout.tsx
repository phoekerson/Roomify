import type { Metadata } from "next";
import "./globals.css";
import {Inter} from "next/font/google";
import { Navbar } from "./components/Navbar";

const inter = Inter({ subsets: ["latin"]});


export const metadata: Metadata = {
  title: "Roomify",
  description: "Find best room to spend your vacation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}
      >
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
