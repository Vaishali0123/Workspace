"use client";
import { useFetchEarnWithUsQuery } from "@/app/redux/slices/earnwithusApi";

import React, { Suspense, useEffect, useState } from "react";
import Load from "../Components/Load";
import { useSelector } from "react-redux";
import Link from "next/link";
import { RootState } from "@/app/redux/store";
import ComingSoon from "../Components/ComingSoon";
import { useAuthContext } from "@/app/Auth/Components/auth";
import { HiOutlineCash } from "react-icons/hi";
import { BiCoinStack } from "react-icons/bi";
import { TbBuildingBank } from "react-icons/tb";
import { IoStorefrontOutline } from "react-icons/io5";
import { VscMultipleWindows } from "react-icons/vsc";
import { CiBadgeDollar } from "react-icons/ci";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import axios from "axios";
import { API } from "@/app/utils/helpers";
import { setMaxmembers, setOnecom } from "@/app/redux/slices/leastparams";

interface Transaction {
  transactionid: string;
  amount: number;
  status: string;
  type: string;
}
interface CommunityData {
  _id: string;
  communityName: string;
  dp: string;
  dps: string;
  topic: { nature: string }[];
  postcount: number;
  memberCount: number;
  topics: Topics[];
}
interface Topics {
  nature: string;
  postcount: number;
  _id: string;
  topicName: string;
}
const PageContent = () => {
  const { onecom, maxmembers, popularity, post } = useSelector(
    (state: RootState) => state.paramslice
  );
  const [open, setOpen] = useState(false);

  const [open1, setOpen1] = useState(false);
  const [comdata, setComData] = useState<CommunityData[]>([]);

  const { data: authdata } = useAuthContext();
  const [communityId, setCommunityId] = useState("");

  const isStoreVerified = authdata?.isStoreVerified;
  const userId = authdata?.id;

  const [shouldSkip, setShouldSkip] = useState(false);
  const { data, isLoading } = useFetchEarnWithUsQuery(userId, {
    skip: !!shouldSkip,
  });
  const dispatch = useDispatch();
  const [comindex, setComindex] = useState(0);
  const [hasFetched, setHasFetched] = useState<boolean>(false); // Track fetch state

  const fetchCommunity = async () => {
    if (hasFetched) return; // Prevent multiple API calls
    try {
      const res = await axios.get(`${API}/getcommunities/${userId}`);
      console.log(res?.data);
      if (res?.data?.success) {
        if (res?.data?.data?.comdata?.length > 0) {
          dispatch(setOnecom(true));
          dispatch(setMaxmembers(res?.data?.data?.maxmembers));
        }
        setComData(res?.data?.data?.comdata);
        setCommunityId(res?.data?.data?.comdata?.[0]?._id);
        if (communityId) {
        }
        // setTopicId(res?.data?.data?.comdata?.[comindex]?.topics?.[0]?._id);
        setHasFetched(true); // Mark as fetched
        // if (comdata.length > 0) {
        //   fetchComAnalytics(res?.data?.data?.comdata?.[0]?._id);
        // }
      }
    } catch (error) {
      errorHandler(error);
    }
  };
  useEffect(() => {
    if (data) {
      setShouldSkip(true);
    }
    fetchCommunity();
  }, [data]);

  return (
    //  <ComingSoon />;
    !isLoading ? (
      <div className="h-full  pn:max-sm:p-2 space-y-2 w-full">
        <div className="flex gap-2 pn:max-sm:flex-col w-full justify-between items-center">
          {/* data 1 */}
          <div className="border w-full rounded-2xl h-[100%] space-y-2 flex gap-2 items-center p-2 bg-white">
            <div className="rounded-xl bg-green-100 w-10 h-10 flex justify-center items-center">
              <HiOutlineCash className="text-green-600 text-[25px]" />
            </div>
            <div>
              <div className="text-[#667085] text-[14px]">Earnings</div>
              <div className="text-[16px] text-[#222222]  font-semibold ">
                ₹
                {data?.earnwithus?.totalEarning
                  ? data?.earnwithus?.totalEarning
                  : 0}
              </div>
            </div>
          </div>
          {/* data 2 */}
          <div className="border w-full rounded-2xl h-[100%] space-y-2 flex gap-2 items-center p-2 bg-white">
            <div className="rounded-xl bg-yellow-100 w-10 h-10 flex justify-center items-center">
              <BiCoinStack className="text-yellow-500 text-[25px]" />
            </div>
            <div>
              <div className="text-[#667085] text-[14px]">Pending Payments</div>
              <div className="text-[16px] text-[#222222]  font-semibold ">
                ₹
                {data?.earnwithus?.totalEarning
                  ? data?.earnwithus?.totalEarning
                  : 0}
              </div>
            </div>
          </div>
          {/* data 3 */}
          <div className="border w-full rounded-2xl h-[100%] space-y-2 flex gap-2 items-center p-2 bg-white">
            <div className="rounded-xl bg-purple-100 w-10 h-10 flex justify-center items-center">
              <TbBuildingBank className="text-purple-500 text-[25px]" />
            </div>
            <div className=" w-[calc(100%-50px)]">
              <div className="text-[#667085] text-[14px]">Add Bank</div>
              <div className="flex justify-between w-full ">
                <div className="text-[15px] text-[#222222]  font-semibold ">
                  ₹
                  {data?.earnwithus?.totalEarning
                    ? data?.earnwithus?.totalEarning
                    : "xxxxxxx90A"}
                </div>
                <div className="text-[14px] hover:bg-slate-50 border rounded-full px-3 select-none cursor-pointer text-[#222222]  font-semibold">
                  +
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-2  pn:max-sm:flex-col h-[260px] w-full justify-between items-start">
          {/* data 1 */}
          {!isStoreVerified && (
            <div className="border w-full   rounded-2xl relative space-y-2 flex flex-col justify-between gap-2 p-2 bg-white  h-[100%]">
              <div className="space-y-2">
                {/* icon & title  */}
                <div className="flex text-gray-800  gap-2">
                  {/* icon  */}
                  <div className="rounded-xl  flex justify-center items-center">
                    <IoStorefrontOutline className=" text-[25px]" />
                  </div>
                  {/* title  */}
                  <div className="font-semibold text-[15px] pt-2 flex items-center">
                    Create Store
                    {/* <span className="text-[12px] font-bold text-green-600  pl-1">
                    Free
                  </span> */}
                  </div>
                </div>
                {/* desc  */}
                <div className="text-[12px] px-2 text-gray-500">
                  To be eligible for creating a store or uploading products,
                  users must first establish a community presence by creating
                  and contributing at least one post in the community.
                </div>
              </div>
              {/* bars  */}
              <div className="space-y-2 px-2 ">
                {/* bar 1 */}
                <div className="space-y-1 w-full">
                  <div className="flex justify-between px-1 ">
                    <div className="text-[12px]">
                      Create Atleast One Community
                    </div>
                    <div className="text-[12px]">{onecom ? "1" : "0"}/1</div>
                  </div>
                  <div className="relative w-full h-[10px] bg-gray-100 rounded-full">
                    <div
                      className={`abfsolute top-0 left-0 h-full ${
                        onecom ? "w-[100%]" : ""
                      } bg-gradient-to-tr from-blue-400 via-sky-400 to-indigo-400 rounded-full`}
                    ></div>
                  </div>
                </div>
                {/* bar 2  */}
                <div className="space-y-1 w-full">
                  <div className="flex justify-between">
                    <div className="text-[12px]">
                      Upload atleast one post in your any community
                    </div>
                    <div className="text-[12px]">
                      {onecom && post >= 1 ? "1" : "0"}/1
                    </div>
                  </div>
                  <div className="relative w-full h-[10px] bg-gray-100 rounded-full">
                    <div
                      className={`absolute top-0 left-0 h-full ${
                        onecom && post >= 1 ? "w-[100%]" : ""
                      } bg-gradient-to-tr from-green-500 via-green-600 to-green-700 rounded-full`}
                    ></div>
                  </div>
                </div>
              </div>
              {/* button  */}
              <div className="space-y-1 pt-1 flex justify-end w-full">
                <Link
                  href={"/main/Store"}
                  className="flex items-center gap-1 rounded-xl w-[99%] justify-center px-4 py-2 text-[12px] font-medium bg-blue-600 text-white"
                >
                  Create Store
                </Link>
              </div>
            </div>
          )}
          {/* data 2 */}
          <div className="border w-full rounded-2xl relative space-y-2 flex flex-col justify-between overflow-hidden gap-2 p-2 bg-white h-[100%]">
            <div className="space-y-2">
              <div className="flex text-gray-800 justify-between">
                {/* icon & title  */}
                <div className="flex text-gray-800  gap-2">
                  {/* icon  */}
                  <div className="rounded-xl  flex justify-center items-center">
                    <VscMultipleWindows className=" text-[25px]" />
                  </div>
                  {/* title  */}
                  <div className="font-semibold text-[15px] pt-2 flex items-center">
                    Create Topic
                  </div>
                </div>
                {/* select community */}
                <div className="rounded-3xl ">
                  <div
                    onClick={() => setOpen1(!open1)}
                    className="flex w-full justify-between items-center border gap-2 p-1 bg-white rounded-2xl"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-[30px] h-[30px] rounded-xl border">
                        <img
                          loading="lazy"
                          alt="dps"
                          src={comdata?.[comindex]?.dp}
                          className=" bg-contain bg-slate-400 rounded-xl w-[30px] h-[30px]"
                        />
                      </div>
                      <div className="whitespace-nowrap text-[14px] text-ellipsis">
                        {comdata?.[comindex]?.communityName}
                      </div>
                    </div>
                    <RiArrowDropDownLine />
                  </div>
                  {open ? (
                    <div className="py-1 rounded-2xl border w-[120px] absolute mt-2 overflow-auto">
                      {comdata.map((d, i: number) => (
                        <div
                          key={i}
                          onClick={() => {
                            setComindex(i);
                            setCommunityId(d?._id);
                            // fetchComAnalytics(d?._id);
                            // setTopicId("");
                            setOpen1(!open1);
                          }}
                          className="flex w-full justify-between items-center p-1 hover:bg-gray-50 select-none cursor-pointer bg-white"
                        >
                          <div className="flex items-center bg-white gap-2">
                            <div className="w-[30px] h-[30px] rounded-xl border">
                              <img
                                loading="lazy"
                                alt="dps"
                                src={d?.dp}
                                className=" bg-contain bg-slate-400 rounded-xl w-[30px] h-[30px]"
                              />
                            </div>
                            <div className="">{d?.communityName}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
              {/* desc  */}
              <div className="text-[12px] px-2 text-gray-500 ">
                To create a paid or free topic, first, build a community with at
                least 150 members and achieve a 10% popularity. Keep your
                community interactive and engaging to meet these requirements.
              </div>
            </div>
            {/* bars  */}
            <div className="space-y-2 px-2">
              {/* bar 1 */}
              <div className="space-y-1 w-full">
                <div className="flex justify-between px-1 ">
                  <div className="text-[12px]">
                    Achieve 150 members in your community
                  </div>
                  <div className="text-[12px]">{maxmembers}/150</div>
                </div>
                <div className="relative w-full h-[10px] bg-gray-100 rounded-sm">
                  <div
                    style={{
                      width: `${Math.min((maxmembers / 150) * 100, 100)}%`,
                    }}
                    className={`abfsolute top-0 left-0 h-full bg-gradient-to-tr from-blue-400 via-sky-400 to-indigo-400 rounded-sm`}
                  ></div>
                </div>
              </div>
              {/* bar 2  */}
              <div className="space-y-1 w-full">
                <div className="flex justify-between">
                  <div className="text-[12px]">Popularity</div>
                  <div className="text-[12px]">10%</div>
                </div>
                <div className="relative w-full h-[10px] bg-gray-100 rounded-full">
                  <div
                    style={{
                      width: `${popularity}%`,
                    }}
                    className={`absolute top-0 left-0 h-full 
                     bg-gradient-to-tr from-green-500 via-green-600 to-green-700 rounded-full`}
                  ></div>
                </div>
              </div>
            </div>
            {/* button  */}
            <div className="space-y-1 pt-1 flex justify-end w-full">
              <Link
                href={"/main/Store"}
                className="flex items-center gap-1 rounded-xl w-[99%] justify-center px-4 py-2 text-[12px] font-medium bg-blue-600 text-white"
              >
                Create Topic
              </Link>
            </div>
            <div className="absolute -top-2 left-0 bg-[#20202028] w-full h-full text-gray-500 text-[12px] flex items-center justify-center font-semibold">
              <ComingSoon />
            </div>
          </div>

          {/* data 3 */}
          <div className="border w-full rounded-2xl overflow-hidden relative space-y-2 flex flex-col justify-between gap-2 p-2 bg-white h-[100%]">
            <div className="space-y-2 ">
              <div className="flex text-gray-800 justify-between">
                {/* icon & title  */}
                <div className="flex text-gray-800  gap-2">
                  {/* icon  */}
                  <div className="rounded-xl  flex justify-center items-center">
                    <CiBadgeDollar className=" text-[25px]" />
                  </div>
                  {/* title  */}
                  <div className="font-semibold text-[15px] pt-2 flex items-center">
                    Ad Revenue
                  </div>
                </div>
                {/* select community */}
                <div className="rounded-3xl ">
                  <div
                    onClick={() => setOpen(!open)}
                    className="flex w-full justify-between items-center border gap-2 p-1 bg-white rounded-2xl"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-[30px] h-[30px] rounded-xl border">
                        <img
                          loading="lazy"
                          alt="dps"
                          src={comdata?.[comindex]?.dp}
                          className=" bg-contain bg-slate-400 rounded-xl w-[30px] h-[30px]"
                        />
                      </div>
                      <div className="whitespace-nowrap text-[14px] text-ellipsis">
                        {comdata?.[comindex]?.communityName}
                      </div>
                    </div>
                    <RiArrowDropDownLine />
                  </div>
                  {open ? (
                    <div className="py-1 rounded-2xl border w-[120px] absolute mt-2 overflow-auto">
                      {comdata.map((d, i: number) => (
                        <div
                          key={i}
                          onClick={() => {
                            setComindex(i);
                            setCommunityId(d?._id);
                            // fetchComAnalytics(d?._id);
                            // setTopicId("");
                            setOpen(!open);
                          }}
                          className="flex w-full justify-between items-center p-1 hover:bg-gray-50 select-none cursor-pointer bg-white"
                        >
                          <div className="flex items-center bg-white gap-2">
                            <div className="w-[30px] h-[30px] rounded-xl border">
                              <img
                                loading="lazy"
                                alt="dps"
                                src={d?.dp}
                                className=" bg-contain bg-slate-400 rounded-xl w-[30px] h-[30px]"
                              />
                            </div>
                            <div className="">{d?.communityName}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
              {/* desc  */}
              <div className="text-[12px] px-2 text-gray-500">
                To earn through Ad Revenue, apply for community monetization
                once you reach 500 members and at least 10% popularity. After
                approval, your community will start earning.
              </div>
            </div>
            {/* bars  */}
            <div className="space-y-2 px-2">
              {/* bar 1 */}
              <div className="space-y-1 w-full">
                <div className="flex justify-between px-1 ">
                  <div className="text-[12px]">
                    Achieve 500 members in your community
                  </div>
                  <div className="text-[12px]">{maxmembers}/500</div>
                </div>
                <div className="relative w-full h-[10px] bg-gray-100 rounded-sm">
                  <div
                    style={{
                      width: `${Math.min((maxmembers / 150) * 100, 100)}%`,
                    }}
                    className={`abfsolute top-0 left-0 h-full bg-gradient-to-tr from-blue-400 via-sky-400 to-indigo-400 rounded-sm`}
                  ></div>
                </div>
              </div>
              {/* bar 2  */}
              <div className="space-y-1 w-full">
                <div className="flex justify-between">
                  <div className="text-[12px]">Popularity</div>
                  <div className="text-[12px]">10%</div>
                </div>
                <div className="relative w-full h-[10px] bg-gray-100 rounded-full">
                  <div
                    style={{
                      width: `${popularity}%`,
                    }}
                    className={`absolute top-0 left-0 h-full 
                     bg-gradient-to-tr from-green-500 via-green-600 to-green-700 rounded-full`}
                  ></div>
                </div>
              </div>
            </div>
            {/* button  */}
            <div className="space-y-1 pt-1 flex justify-end w-full">
              <Link
                href={"/main/Store"}
                className="flex items-center gap-1 rounded-xl w-[99%] justify-center px-4 py-2 text-[12px] font-medium bg-blue-600 text-white"
              >
                Apply
              </Link>
            </div>
            <div className="absolute -top-2 left-0 bg-[#20202028] w-full h-full text-gray-500 text-[12px] flex items-center justify-center font-semibold">
              <ComingSoon />
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col space-y-2 justify-end">
          {/* Transaction History */}
          <div className="text-[20px] font-semibold ">Transaction History</div>
          <div className="rounded-xl border w-full bg-white">
            <div className="bg-[#faf8fc] border-b gap-2 flex justify-between p-4 font-semibold text-[14px] rounded-t-xl">
              <div className="w-[20%] ">Transaction ID</div>
              <div className="w-[20%] text-center">Type</div>
              <div className="w-[20%] text-center">Status </div>
              <div className="w-[20%] text-center">Amount </div>
            </div>
            {data?.transactions?.length > 0 ? (
              data?.transactions.map((d: Transaction, i: number) => (
                <div
                  key={i}
                  className="flex  justify-between p-4 gap-2 text-[12px] mt-3 "
                >
                  <div className="w-[20%] ">{d?.transactionid}</div>
                  <div className="w-[20%] text-center">{d?.type}</div>

                  <div className="w-[20%] text-center">{d?.status} </div>
                  <div className="w-[20%] text-center text-red-500">
                    ₹ {d?.amount}
                  </div>
                  <div className="flex w-[20%] justify-center items-center ">
                    <div className="rounded-xl border border-green-500 px-2 py-1 text-[12px] text-green-600 font-semibold">
                      Download
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex  items-center justify-center p-4 gap-2 text-[14px] mt-3 ">
                No transactions found
              </div>
            )}
          </div>
        </div>
      </div>
    ) : (
      <Load />
    )
  );
};
const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageContent />
    </Suspense>
  );
};
function errorHandler(error: unknown) {
  if (error instanceof Error) {
    console.error("An error occurred:", error.message);
  } else {
    console.error("An unknown error occurred:", error);
  }
}

export default Page;
