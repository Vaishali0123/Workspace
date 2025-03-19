"use client";
import { useFetchEarnWithUsQuery } from "@/app/redux/slices/earnwithusApi";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import { BsPeople } from "react-icons/bs";
import { FiShoppingBag } from "react-icons/fi";
import { PiClipboardText } from "react-icons/pi";
import Load from "../Components/Load";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useAuthContext } from "@/app/Auth/Components/auth";
import { RootState } from "@/app/redux/store";
interface Transaction {
  transactionid: string;
  amount: number;
  status: string;
  type: string;
}
const PageContent = () => {
  const searchParams = useSearchParams();
  const { onecom, maxmembers, popularity, post } = useSelector(
    (state: RootState) => state.paramslice
  );
  const { data: authdata } = useAuthContext();

  const isStoreVerified = authdata?.isStoreVerified;
  const userId = searchParams.get("userId");
  const [shouldSkip, setShouldSkip] = useState(false);
  const { data, isLoading } = useFetchEarnWithUsQuery(userId, {
    skip: !!shouldSkip,
  });

  useEffect(() => {
    if (data) {
      setShouldSkip(true);
    }
  }, [data]);
  // onst earnings = await User.findById(userId)
  // .select("earnwithus _id transactions")
  // .populate(
  //   "earnwithus",
  //   "userId totalEarning customers buyers topicEarning collectionId monetization"
  // )
  // .populate("transactions", "transactionid amount status type")
  // .limit(5)
  // .lean();
  // if (!earnings) {
  // return res.status(304).json({
  //   message: "User earnings not found",

  //   success: false,
  // });
  // }
  return !isLoading ? (
    <div className="h-full  pn:max-sm:p-2 space-y-2 w-full">
      <div className="flex gap-2 pn:max-sm:flex-col w-full justify-between items-center">
        {/* <div className="flex w-full h-full gap-2 items-center"> */}
        {/* data 1 */}
        <div className="border w-full rounded-2xl h-[100%] space-y-2 flex gap-2 items-center p-2 bg-white">
          <div className="rounded-full bg-green-100 w-10 h-10 flex justify-center items-center">
            <PiClipboardText className="text-green-600 text-[25px]" />
          </div>
          <div>
            <div className="text-[#667085] font-semibold">Earnings</div>
            <div className="text-[18px]">
              ₹
              {data?.earnwithus?.totalEarning
                ? data?.earnwithus?.totalEarning
                : 0}
            </div>
          </div>
        </div>
        {/* data 2 */}
        <div className="border w-full bg-white rounded-2xl space-y-2 flex gap-2 items-center h-[100%] p-2">
          <div className="rounded-full bg-purple-100 w-10 h-10 flex justify-center items-center">
            <BsPeople className="text-purple-600 text-[25px]" />
          </div>
          {/* <div>
            <div className=" text-[#667085] font-semibold">Members</div>
            <div className="text-[20px]">
              {data?.earnwithus?.customers ? data?.earnwithus?.customers : 0}
            </div>
          </div> */}
        </div>
        {/* data 3 */}
        <div className="border w-full bg-white rounded-2xl space-y-2 flex gap-2 items-center h-[100%] p-2">
          <div className="rounded-full bg-blue-100 w-10 h-10 flex justify-center items-center">
            <FiShoppingBag className="text-blue-600 text-[25px]" />
          </div>
          <div>
            <div className=" text-[#667085] font-semibold">Customers</div>
            <div className="text-[20px]">
              {data?.earnwithus?.buyers ? data?.earnwithus?.buyers : 0}
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-2 pn:max-sm:flex-col w-full justify-between items-start">
        {/* data 1 */}
        {!isStoreVerified && (
          <div className="border w-full  rounded-2xl h-[100%] space-y-2 flex gap-2 p-2 bg-white">
            <div className="rounded-full bg-green-100 w-10 h-10 flex justify-center items-center">
              <PiClipboardText className="text-green-600 text-[25px]" />
            </div>
            <div className="text-[#667085] space-y-2 font-semibold w-[80%]">
              <div className="text-gray-800 text-[15px] font-semibold flex items-center">
                Create Store{" "}
                <span className="text-[12px] font-bold text-green-600  pl-1">
                  Free
                </span>
              </div>
              <div className="text-[12px] text-gray-500 ">
                To be eligible for creating a store or uploading products, users
                must first establish a community presence by creating and
                contributing at least one post in the community.
              </div>
              <div className="space-y-1 w-full">
                <div className="flex justify-between font-semibold">
                  <div className="text-[12px]">
                    Create Atleast One Community
                  </div>
                  <div className="text-[12px]">&gt;=1</div>
                </div>
                <div className="relative w-full h-[10px] bg-gray-100 rounded-full">
                  <div
                    className={`absolute top-0 left-0 h-full ${
                      onecom ? "w-[100%]" : ""
                    } bg-green-500 rounded-full`}
                  ></div>
                </div>
              </div>
              <div className="space-y-1 w-full">
                <div className="flex justify-between font-semibold">
                  <div className="text-[12px]">
                    Upload atleast one post in your any community
                  </div>
                  {/* <div className="text-[12px]">1 Post</div> */}
                </div>
                <div className="relative w-full h-[10px] bg-gray-100 rounded-full">
                  <div
                    className={`absolute top-0 left-0 h-full ${
                      onecom && post >= 1 ? "w-[100%]" : ""
                    } bg-green-500 rounded-full`}
                  ></div>
                </div>
              </div>
              <div className="space-y-1 pt-1 flex justify-end w-full">
                <Link
                  href={"/main/Store"}
                  className="flex items-center gap-1 rounded-2xl w-full justify-center px-4 py-2 text-[12px] font-medium bg-blue-600 text-white"
                >
                  Create Store
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* data 2 */}
        <div className="border w-full  rounded-2xl h-[100%] space-y-2 flex gap-2 p-2 bg-white">
          <div className="rounded-full bg-green-100 w-10 h-10 flex justify-center items-center">
            <PiClipboardText className="text-green-600 text-[25px]" />
          </div>
          <div className="text-[#667085] space-y-2 font-semibold w-[80%]">
            <div className="text-gray-800 text-[15px] font-semibold flex items-center">
              Topics
            </div>
            <div className="text-[12px] text-gray-500 ">
              To create a paid or free topic, you first need to establish a
              community with at least 150 members and maintain a 10% popularity.
              Focus on making your community interactive and engaging to meet
              the requirements.{" "}
            </div>
            <div className="space-y-1 w-full">
              <div className="flex justify-between font-semibold">
                <div className="text-[12px]">
                  Achieve 150 members in your community
                </div>
                <div className="text-[12px]">{maxmembers}</div>
              </div>
              <div className="relative w-full h-[10px] bg-gray-100 rounded-full">
                <div
                  style={{
                    width: `${Math.min((maxmembers / 150) * 100, 100)}%`,
                  }}
                  className={`absolute top-0 left-0 h-full   bg-green-500 rounded-full`}
                ></div>
              </div>
            </div>
            <div className="space-y-1 w-full">
              <div className="flex justify-between font-semibold">
                <div className="text-[12px]">Popularity</div>
                <div className="text-[12px]">&gt;=10%</div>
              </div>
              <div className="relative w-full h-[10px] bg-gray-100 rounded-full">
                <div
                  style={{
                    width: `${popularity}%`,
                  }}
                  className={`absolute top-0 left-0 h-full   bg-green-500 rounded-full`}
                ></div>
              </div>
            </div>
            <div className="space-y-2 pt-2 flex justify-end w-full">
              <div className="flex items-center gap-1 rounded-2xl w-full justify-center px-4 py-2 text-[12px] font-medium bg-blue-600 text-white">
                Create Topic
              </div>
            </div>
          </div>
        </div>
        {/* data 3 */}
        <div className="border w-full  rounded-2xl h-[100%] space-y-2 flex gap-2 p-2 bg-white">
          <div className="rounded-full bg-green-100 w-10 h-10 flex justify-center items-center">
            <PiClipboardText className="text-green-600 text-[25px]" />
          </div>
          <div className="text-[#667085] space-y-2 font-semibold w-[80%]">
            <div className="text-gray-800 text-[15px] font-semibold flex items-center">
              Ad Revenue
            </div>
            <div className="text-[12px] text-gray-500 ">
              To earn through Ad Revenue, apply for community monetization once
              you reach 500 members and at least 10% popularity. After approval,
              your community will start earning.
            </div>
            <div className="space-y-1 w-full">
              <div className="flex justify-between font-semibold">
                <div className="text-[12px]">
                  Achieve 500 members in your community
                </div>
                <div className="text-[12px]">{maxmembers}</div>
              </div>
              <div className="relative w-full h-[10px] bg-gray-100 rounded-full">
                <div
                  style={{
                    width: `${Math.min((maxmembers / 500) * 100, 100)}%`,
                  }}
                  className={`absolute top-0 left-0 h-full  bg-green-500 rounded-full`}
                ></div>
              </div>
            </div>
            <div className="space-y-1 w-full">
              <div className="flex justify-between font-semibold">
                <div className="text-[12px]">Popularity</div>
                <div className="text-[12px]">&gt;=10%</div>
              </div>
              <div className="relative w-full h-[10px] bg-gray-100 rounded-full">
                <div
                  style={{
                    width: `${popularity}%`,
                  }}
                  className="absolute top-0 left-0 h-full  bg-green-500 rounded-full"
                ></div>
              </div>
            </div>
            <div className="space-y-2 pt-2 flex justify-end w-full">
              <div className="flex items-center gap-1 rounded-2xl w-full justify-center px-4 py-2 text-[12px] font-medium bg-blue-600 text-white">
                Apply
              </div>
            </div>
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
            {/* <div className="w-[20%] text-center">Date</div> */}
            <div className="w-[20%] text-center">Status </div>
            <div className="w-[20%] text-center">Amount </div>
            {/* <div className="w-[20%] text-center">Invoice</div> */}
          </div>
          {data?.transactions?.length > 0 ? (
            data?.transactions.map((d: Transaction, i: number) => (
              <div
                key={i}
                className="flex  justify-between p-4 gap-2 text-[12px] mt-3 "
              >
                <div className="w-[20%] ">{d?.transactionid}</div>
                <div className="w-[20%] text-center">{d?.type}</div>
                {/* <div className="w-[20%] text-center">{d?.date}</div> */}
                <div className="w-[20%] text-center">{d?.status} </div>
                <div className="w-[20%] text-center text-red-500">
                  ₹ {d?.amount}
                </div>
                {/* <div className="flex w-[20%] justify-center items-center ">
               <div className="rounded-xl border border-green-500 px-2 py-1 text-[12px] text-green-600 font-semibold">
                 Download
               </div>
             </div> */}
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
  );
};
const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageContent />
    </Suspense>
  );
};
export default Page;
