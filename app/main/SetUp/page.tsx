"use client";
import React, { useState } from "react";
// import Image from "next/image";
import { FaInstagram, FaLinkedin, FaSnapchat } from "react-icons/fa";
import { RiYoutubeLine } from "react-icons/ri";
import { MdOutlineModeEdit } from "react-icons/md";
const Page = () => {
  const [click, setClick] = useState<number>(0);
  return (
    <div className="bg-white w-full h-full px-2">
      <div className="h-[50px] w-full border-b items-center px-2 flex gap-4">
        <div
          onClick={() => setClick(0)}
          className={`h-full flex items-center justify-center cursor-pointer duration-300 ${
            click === 0
              ? "font-semibold text-[#307fff] border-b-2 border-[#307fff]"
              : "border-b-2 border-white"
          }`}
        >
          Your Details
        </div>
        <div
          className={`h-full flex items-center justify-center cursor-pointer duration-300 ${
            click === 1
              ? "font-semibold text-[#307fff] border-b-2 h-full border-[#307fff]"
              : "border-b-2 border-white"
          }`}
          onClick={() => setClick(1)}
        >
          {" "}
          Social Media
        </div>
        <div
          className={`h-full flex items-center justify-center cursor-pointer duration-300 ${
            click === 2
              ? "font-semibold text-[#307fff] border-b-2 h-full flex border-[#307fff]"
              : "border-b-2 border-white"
          }`}
          onClick={() => setClick(2)}
        >
          Address
        </div>
      </div>
      {click === 0 ? (
        <div className="space-y-4 p-2 overflow-auto w-full">
          <div className="flex px-2 gap-2 items-center">
            <div className="flex items-center gap-2 ">
              <div className="h-[60px] w-[60px] rounded-[25px] border flex items-center p-[2px] justify-center border-dashed relative">
                <img
                  src="/img.png"
                  alt="profile"
                  className="h-full w-full bg-slate-100 rounded-[22px]"
                />
                <div className="bg-[#307fff] -bottom-2 -left-2 text-white p-1 rounded-full absolute">
                  <MdOutlineModeEdit />
                </div>
              </div>
            </div>
            <div className="bg-white border rounded-xl  text-[14px] p-2 w-full">
              <div className="text-[#6a6a6a]">Full Name</div>
              <input
                className="px-2 outline-none w-full"
                placeholder="Enter you fullname"
              />
            </div>
            <div className="text-[#307fff]">Edit</div>
          </div>
          <div className="flex px-2 gap-2 items-center">
            <div className="bg-white border rounded-xl text-[14px] p-2 w-full">
              <div className="text-[#6a6a6a]">Username</div>
              <input
                className="px-2 outline-none w-full"
                placeholder="Enter your Username"
              />
            </div>
            <div className="text-[#307fff]">Edit</div>
          </div>
          <div className="flex px-2 gap-2 items-center ">
            <div className="bg-white border rounded-xl text-[14px] p-2 w-full">
              <div className="text-[#6a6a6a]">Email Address</div>
              <input
                className="px-2 outline-none w-full"
                placeholder="Enter your Email"
              />
            </div>
            <div className="text-[#307fff]">Edit</div>
          </div>
          <div className="flex px-2 gap-2 items-center">
            <div className="bg-white border rounded-xl text-[14px] p-2 w-full">
              <div className="text-[#6a6a6a] text-[14px]">Phone no</div>
              <div className="flex">
                <div className="text-[#999999]">+91</div>
                <input
                  className="px-2 outline-none w-full"
                  placeholder="XXXXXXXXXXX"
                  type="number"
                />
              </div>
            </div>
            <div className="text-[#307fff]">Edit</div>
          </div>
          <div className="flex px-2 gap-2 items-center">
            <div className="bg-white border rounded-xl text-[14px] p-2 w-full">
              <div className="text-[#6a6a6a]">Bio</div>
              <textarea
                className="px-2 w-full outline-none"
                placeholder="Add a creative bio to attract others"
              />
            </div>
            <div className="text-[#307fff]">Edit</div>
          </div>
        </div>
      ) : (
        <></>
      )}
      {click === 1 ? (
        <div className="p-2 space-y-2">
          <div>
            <div className="font-semibold">Social Media Links</div>
            <div className="text-[14px] text-[#999999]">
              Add Social accounts
            </div>
          </div>
          <div className="flex px-2 gap-2 items-center">
            <FaSnapchat className="h-6 w-6 text-[#dcff3f]" />
            <div className="bg-white border rounded-xl text-[14px] p-2 w-full">
              <div className="text-[#6a6a6a]">Snapchat</div>
              <input
                className="px-2 outline-none w-full"
                placeholder="Paste your Snapchat link"
              />
            </div>
            <div className="text-[#307fff]">Edit</div>
          </div>{" "}
          <div className="flex px-2 gap-2 items-center">
            <RiYoutubeLine className="h-6 w-6 text-[#ff3f3f]" />
            <div className="bg-white border rounded-xl text-[14px] p-2 w-full">
              <div className="text-[#6a6a6a]">Youtube</div>
              <input
                className="px-2 outline-none w-full"
                placeholder="Paste your Youtube channel link"
              />
            </div>
            <div className="text-[#307fff]">Edit</div>
          </div>{" "}
          <div className="flex px-2 gap-2 items-center">
            <FaLinkedin className="h-6 w-6 text-[#3f6cff]" />
            <div className="bg-white border rounded-xl text-[14px] p-2 w-full">
              <div className="text-[#6a6a6a]">LinkedIn</div>
              <input
                className="px-2 outline-none w-full"
                placeholder="Paste your LinkedIn link"
              />
            </div>
            <div className="text-[#307fff]">Edit</div>
          </div>
          <div className="flex px-2 gap-2 items-center">
            <div className="h-6 w-6">X</div>
            <div className="bg-white border rounded-xl text-[14px] p-2 w-full">
              <div className="text-[#6a6a6a] ">X</div>
              <input
                className="px-2 outline-none w-full"
                placeholder="Paste your X link"
              />
            </div>
            <div className="text-[#307fff]">Edit</div>
          </div>
          <div className="flex px-2 gap-2 items-center">
            <FaInstagram className="h-6 w-6 text-[#ff3fec]" />
            <div className="bg-white border rounded-xl text-[14px] p-2 w-full">
              <div className="text-[#6a6a6a]">Instagram</div>
              <input
                className="px-2 outline-none w-full"
                placeholder="Paste your Instagram link"
              />
            </div>
            <div className="text-[#307fff]">Edit</div>
          </div>
        </div>
      ) : (
        <></>
      )}
      {click === 2 ? (
        <div className="flex p-2 flex-col">
          <div>Address</div>
          <div className="bg-white flex justify-evenly items-center  w-full">
            <div className="w-[30%] border rounded-xl space-y-2 p-2">
              <div className="text-[#6a6a6a] ">Store Address</div>

              <input
                className="px-2 outline-none w-[100%]"
                placeholder="House No."
              />
              <input
                className="px-2 outline-none w-[100%]"
                placeholder="City"
              />
              <input
                className="px-2 outline-none w-[100%]"
                placeholder="State"
              />
            </div>
            <div className="w-[30%] border rounded-xl p-2">
              <div className="text-[#6a6a6a] ">Home Address</div>
            </div>

            <div className="w-[30%] border rounded-xl p-2">
              <div className="text-[#6a6a6a] ">Work Address</div>
            </div>
          </div>
          <div></div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Page;
