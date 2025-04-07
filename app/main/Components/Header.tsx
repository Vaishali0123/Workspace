"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import { LuCircleCheckBig } from "react-icons/lu";

interface HeaderProps {
  path: string;
  data: {
    id: string;
    fullname: string;
    dp?: string;
  };
}

const Header: React.FC<HeaderProps> = ({ path, data }) => {
  const [pop, setPop] = useState(false);

  // const detecterror = ({ e }: DetectErrorParams) => {
  //   if (e.response) {
  //     console.log(e.response.data);
  //     console.log(e.response.status);
  //     console.log(e.response.headers);
  //   } else if (e.request) {
  //     console.log(e.request);
  //   } else {
  //     console.log("Error", e.message);
  //   }
  //   console.log(e.config);
  // };

  return (
    <>
      {pop && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-black">
          <div className="bg-white p-4 rounded-xl shadow-lg w-[500px]">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-green-100 w-10 h-10 flex justify-center items-center">
                <LuCircleCheckBig className="text-green-600 text-[25px]" />
              </div>
              <div className="text-[20px] font-semibold ">Collection</div>
            </div>
            <div className="text-[12px] mt-2">
              Group your products into collections for better organization and
              visibility. Add a name and category to highlight your collection.
            </div>
            <div>
              <div className="text-[12px] font-semibold mt-2">
                Collection Name
              </div>
              <input
                placeholder="Collection Name"
                className="w-full h-[30px] rounded-xl p-4 border  border-gray-200 mt-1 text-[12px]"
              />
            </div>
            <div>
              <div className="text-[12px] font-semibold mt-2">
                Collection Category
              </div>
              <input
                placeholder="Retail"
                className="w-full h-[30px] rounded-xl p-4 border  border-gray-200 mt-1 text-[12px]"
              />
            </div>
            <div className="w-full flex justify-center items-center mt-4 space-x-4">
              <button
                onClick={() => setPop(false)}
                className="border border-gray-200 w-[50%] rounded-xl p-2 font-semibold"
              >
                Cancel
              </button>
              <button className="bg-[#3B82F6] text-white w-[50%] rounded-xl p-2 font-semibold">
                Create Collection
              </button>
            </div>
          </div>
        </div>
      )}
      <Toaster position="top-center" reverseOrder={false} />
      <div className="h-full bg-white w-full sm:rounded-2xl  border border-dotted flex items-center justify-between px-2">
        {path === "/main/Overview" && (
          <div className="flex items-center justify-between w-full">
            <div className="text-[20px] font-semibold text-slate-500">
              Hey, {data?.fullname}
            </div>
            <div className="flex h-[40px] w-[40px] items-center justify-center border border-dashed rounded-2xl">
              <div className="flex h-[38px] w-[38px] items-center justify-center bg-slate-500 rounded-[15.2px]">
                <img
                  src={data?.dp ? data?.dp : ""}
                  alt="workspace"
                  width={50}
                  height={50}
                  className="rounded-full  object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        )}
        {path === "/main/Community" && (
          <div className="flex items-center justify-between w-full">
            <div className="text-[20px] font-semibold text-slate-500">
              Communities
            </div>
            {/* {(memdetails?.membership === "65671ded04b7d0d07ef0e794" &&
              comdata?.length >= 5) ||
            (memdetails?.membership === "65671e5204b7d0d07ef0e796" &&
              comdata?.length >= 2) ||
            (memdetails?.membership === "65671e6004b7d0d07ef0e798" &&
              comdata?.length >= 10) ||
            (memdetails?.membership === "6606955f269e752ce4e5e92c" &&
              comdata?.length >= 3) ? (
              <div>...</div>
            ) : ( */}
            <Link
              href="/main/CreateCommunity"
              className="flex px-4 p-2 text-[14px] bg-blue-600 text-white items-center justify-center rounded-xl"
            >
              <div> Create Community</div>
            </Link>
            {/* )} */}
          </div>
        )}
        {path === "/main/Earnwithus" && (
          <div className="flex items-center justify-between w-full">
            <div className="text-[20px] font-semibold text-slate-500">
              Earn with us
            </div>
            <div className="flex h-[40px] w-[40px] items-center justify-center border border-dashed rounded-2xl">
              <div className="flex h-[38px] w-[38px] items-center justify-center bg-slate-500 rounded-2xl">
                <img
                  src={data?.dp ? data?.dp : ""}
                  alt="workspace"
                  width={50}
                  height={50}
                  className="rounded-full pn:max-sm:hidden object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        )}
        {path === "/main/OrderTrack" && (
          <div className="flex items-center justify-between w-full">
            <div className="text-[20px] font-semibold text-slate-500">
              Order Track
            </div>
            <div className="flex h-[40px] w-[40px] items-center justify-center border border-dashed rounded-2xl">
              <div className="flex h-[38px] w-[38px] items-center justify-center bg-slate-500 rounded-2xl">
                <img
                  src={data?.dp ? data?.dp : ""}
                  alt="workspace"
                  width={50}
                  height={50}
                  className="rounded-full pn:max-sm:hidden object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        )}
        {path === "/main/AddProduct" && (
          <div className="flex items-center justify-between w-full">
            <div className="text-[20px] font-semibold text-slate-500">
              Add Product
            </div>
            <div className="flex h-[40px] w-[40px] items-center justify-center border border-dashed rounded-2xl">
              <div className="flex h-[38px] w-[38px] items-center justify-center bg-slate-500 rounded-2xl">
                <img
                  src={data?.dp ? data?.dp : ""}
                  alt="workspace"
                  width={50}
                  height={50}
                  className="rounded-full pn:max-sm:hidden object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        )}

        {path === "/main/Prosite" && (
          <div className="flex items-center justify-between w-full">
            <div className="text-[20px] font-semibold text-slate-500">
              Prosite
            </div>
            <div className="flex h-[40px] w-[40px] items-center justify-center border border-dashed rounded-2xl">
              <div className="flex h-[38px] w-[38px] items-center justify-center bg-slate-500 rounded-2xl">
                <img
                  src={data?.dp ? data?.dp : ""}
                  alt="workspace"
                  width={50}
                  height={50}
                  className="rounded-full  object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        )}
        {path === "/main/SetUp" && (
          <div className="flex items-center justify-between w-full">
            <div className="text-[20px] font-semibold text-slate-500">
              Set Up
            </div>
            <div className="flex h-[40px] w-[40px] items-center justify-center border border-dashed rounded-2xl">
              <div className="flex h-[38px] w-[38px] items-center justify-center bg-slate-500 rounded-2xl">
                <img
                  src={data?.dp ? data?.dp : ""}
                  alt="workspace"
                  width={50}
                  height={50}
                  className="rounded-[20px] pn:max-sm:hidden object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        )}
        {path === "/main/Store" && (
          <div className="flex items-center justify-between w-full">
            <div className="text-[20px] font-semibold text-slate-500">
              Store
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
