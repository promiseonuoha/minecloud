"use client";
import { useState, useEffect } from "react";
import "./globals.css";
import { Inter } from "next/font/google";
import NavBar from "./components/navBar";
import SideBar from "./components/sideBar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [left, setLeft] = useState("-100%");
  const toggleLeft = () => {
    left === "-100%" ? setLeft("20px") : setLeft("-100%");
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="w-full h-screen bg-transparent relative before:content-[''] before:absolute before:w-full before:h-[50vh] before:-z-10 before:bottom-0 before:left-0 before:bg-[rgba(255,255,255,0.9)] p-7 max-[700px]:p-5">
          <div className="absolute w-full -z-10 top-0 left-0 h-[50vh] bg-neutral-100"></div>

          <NavBar onClick={toggleLeft} />
          <section className="w-full pt-4 flex gap-6">
            <SideBar onClick={toggleLeft} left={left} />
            <div className="w-[calc(100%-239px)] max-[670px]:w-full h-[80vh]">
              {children}
            </div>
          </section>
        </main>
      </body>
    </html>
  );
}
