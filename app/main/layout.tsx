"use client";
import React, { memo } from "react";
import Header from "./Components/Header";
import Navbar from "./Components/Navbar";
import { useAuthContext } from "../Auth/Components/auth";
import { usePathname } from "next/navigation";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const MemorizedNav = memo(Navbar);
  const MemorizedHeader = memo(Header);
  const { data } = useAuthContext();
  const path = usePathname();

  return (
    <div className="h-screen w-screen flex fixed bg-slate-50">
      <div className="h-full pn:max-sm:fixed bg-white z-10 md:w-[350px]">
        <MemorizedNav path={path} />
      </div>
      <div className="h-full w-full bg-slate-50 sm:space-y-2 sm:p-2">
        <div
          className={`${
            path === "/main/CreateCommunity" ||
            path === "/main/Post" ||
            path === "/main/AddProduct" ||
            path === "/main/CreatePost"
              ? "hidden"
              : "h-[60px] w-full"
          }`}
        >
          {data && <MemorizedHeader data={data} path={path} />}
        </div>
        <div
          className={`-z-10 w-full  overflow-auto ${
            path === "/main/CreateCommunity" ||
            path === "/main/Post" ||
            path === "/main/AddProduct" ||
            path === "/main/CreatePost"
              ? "h-[98%] sm:rounded-none"
              : "h-[calc(100%-70px)] sm:rounded-2xl "
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
