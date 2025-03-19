"use client";

import React, { Suspense, useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import axios from "axios";
import { API } from "@/app/utils/helpers";
import toast, { Toaster } from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useFetchComQuery } from "@/app/redux/slices/comSlice";
interface Topics {
  nature: string;
  postcount: number;
  _id: string;
  topicName: string;
}
interface CommunityData {
  _id: string;
  communityName: string;
  dp: string;
  dps: string;
  topics: { nature: string }[];
  postcount: number;
  memberCount: number;
}

const PageContent = () => {
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const userId = searchParams.get("userId");
  const [shouldSkip, setShouldSkip] = useState(false);
  const { data, isLoading } = useFetchComQuery(userId, {
    skip: !!shouldSkip,
  });

  useEffect(() => {
    if (data) {
      setShouldSkip(true);
    }
  }, [data]);
  // const [comdata, setComData] = useState<CommunityData[]>([]);
  // const comdataString = searchParams.get("comdata");
  // const comdata = comdataString
  //   ? JSON.parse(decodeURIComponent(comdataString))
  //   : [];
  const [selectedCommunity, setSelectedCommunity] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  // Open popup for a specific communit

  // Fetch community data from the API
  // const fetchCommunity = async () => {
  //   setLoading(true);
  //   if (hasFetched) return; // Prevent multiple API calls
  //   try {
  //     const res = await axios.get(`${API}/getcommunities/${data?.id}`);

  //     setComData(res?.data?.data?.comdata);
  //     setHasFetched(true); // Mark as fetched
  //   } catch (error) {
  //     console.error(error);
  //   }
  //   setLoading(false);
  // };

  // Function to delete a community
  const deleteCommunity = async (communityId: string) => {
    setLoading(true);
    // setError(""); // Reset any previous error
    setOpen(!open);
    toast.success("Community Deleted Successfully");
    window.location.reload(); // This reloads the entire page

    try {
      const res = await axios.delete(
        `${API}/deletecom/${data?.id}/${communityId}`
      );
      // setComData((prevData) =>
      //   prevData.filter((com) => com._id !== communityId)
      // );
      // Optionally show a success message
      alert(res.data.message);
    } catch (err: unknown) {
      console.log(err);
      // setError(err.response?.data?.message || "Failed to delete community");
    } finally {
      setLoading(false);
    }
  };

  // Function to open the popup

  const toggleMenu = (communityId: string) => {
    setOpen(true);
    setSelectedCommunity(communityId);
  };

  // Function to close the popup

  // useEffect(() => {
  //   if (userId && !hasFetched) {
  //     fetchCommunity();
  //   }
  // }, [userId, hasFetched]);

  return (
    <>
      <Toaster />
      <div className=" sm:rounded-2xl relative sm:border h-full w-full pn:max-sm:h-[calc(100vh - 50px)] overflow-hidden sm:bg-white">
        <div className="font-semibold text-[15px] h-[50px] tracking-tighter flex p-3 items-center w-full pn:max-sm:hidden rounded-t-xl bg-[#F1F4F9]">
          <div className="w-[50%]">Communities</div>
          <div className="w-[20%] text-center">Topics</div>
          <div className="w-[20%] text-center">Posts</div>
          <div className="w-[20%] text-center">Members</div>
          {/* <div className="w-[30%] text-center">Engagement Rate</div> */}
          <div className="flex justify-center w-5 relative">
            {/* <BsThreeDotsVertical className="text-gray-500 cursor-pointer" /> */}
          </div>
        </div>

        <div className="h-[calc(100%-50px)] w-full overflow-auto">
          {isLoading ? (
            <>
              <div className="items-center w-full pn:max-sm:space-y-2 border-b p-2 relative bg-[#F8FAFC] shadow-sm ">
                <div className="flex items-center justify-between gap-4 w-full">
                  <div className="flex items-center w-[50%] gap-2">
                    <div className="h-[50px] w-[50px] rounded-[18px] border border-dashed flex items-center justify-center">
                      <div className=" bg-contain animate-pulse bg-slate-200 h-[44px] rounded-[16px] w-[44px]" />
                    </div>
                    <div className="font-semibold h-[10px] w-[20%] animate-pulse rounded-full bg-slate-200 text-black"></div>
                  </div>

                  <div className="w-[15%] h-[10px] animate-pulse rounded-full bg-slate-200 pn:max-sm:hidden"></div>
                  <div className="w-[15%] h-[10px] animate-pulse rounded-full bg-slate-200 pn:max-sm:hidden"></div>
                  <div className="w-[15%] h-[10px] animate-pulse rounded-full bg-slate-200 pn:max-sm:hidden"></div>
                  <div className="w-[20%] h-[10px] animate-pulse rounded-full bg-slate-200 pn:max-sm:hidden"></div>
                  <div className="flex justify-center w-3 animate-pulse h-[10px] bg-slate-200 rounded-full"></div>
                </div>
                <div className="grid grid-cols-2 gap-2 items-center sm:hidden justify-between w-full">
                  <div className="w-[100%] bg-white border rounded-2xl space-y-2 p-2 text-[12px]">
                    <div className="">Topics</div>
                    <div className="w-full h-[10px] animate-pulse rounded-full bg-slate-200 text-center"></div>
                  </div>
                  <div className="w-[100%] bg-white border rounded-2xl space-y-2 p-2 text-[12px]">
                    <div className="">Post</div>
                    <div className="w-full  h-[10px] animate-pulse rounded-full bg-slate-200 "></div>
                  </div>
                  <div className="w-[100%] bg-white border rounded-2xl space-y-2 p-2 text-[12px]">
                    <div className="">Member</div>
                    <div className="w-full h-[10px] animate-pulse rounded-full bg-slate-200 "></div>
                  </div>
                  <div className="w-[100%] bg-white border rounded-2xl space-y-2 p-2 text-[12px]">
                    <div className="">Engagement rate</div>
                    <div className=" h-[10px] animate-pulse rounded-full bg-slate-200  w-full"></div>
                  </div>
                </div>
              </div>
              <div className="items-center w-full pn:max-sm:space-y-2 border-b p-2 relative bg-[#F8FAFC] shadow-sm ">
                <div className="flex items-center justify-between gap-4 w-full">
                  <div className="flex items-center w-[50%] gap-2">
                    <div className="h-[50px] w-[50px] rounded-[18px] border border-dashed flex items-center justify-center">
                      <div className=" bg-contain animate-pulse bg-slate-200 h-[44px] rounded-[16px] w-[44px]" />
                    </div>
                    <div className="font-semibold h-[10px] w-[20%] animate-pulse rounded-full bg-slate-200 text-black"></div>
                  </div>

                  <div className="w-[15%] h-[10px] animate-pulse rounded-full bg-slate-200 pn:max-sm:hidden"></div>
                  <div className="w-[15%] h-[10px] animate-pulse rounded-full bg-slate-200 pn:max-sm:hidden"></div>
                  <div className="w-[15%] h-[10px] animate-pulse rounded-full bg-slate-200 pn:max-sm:hidden"></div>
                  <div className="w-[20%] h-[10px] animate-pulse rounded-full bg-slate-200 pn:max-sm:hidden"></div>
                  <div className="flex justify-center w-3 animate-pulse h-[10px] bg-slate-200 rounded-full"></div>
                </div>
                <div className="grid grid-cols-2 gap-2 items-center sm:hidden justify-between w-full">
                  <div className="w-[100%] bg-white border rounded-2xl space-y-2 p-2 text-[12px]">
                    <div className="">Topics</div>
                    <div className="w-full h-[10px] animate-pulse rounded-full bg-slate-200 text-center"></div>
                  </div>
                  <div className="w-[100%] bg-white border rounded-2xl space-y-2 p-2 text-[12px]">
                    <div className="">Post</div>
                    <div className="w-full  h-[10px] animate-pulse rounded-full bg-slate-200 "></div>
                  </div>
                  <div className="w-[100%] bg-white border rounded-2xl space-y-2 p-2 text-[12px]">
                    <div className="">Member</div>
                    <div className="w-full h-[10px] animate-pulse rounded-full bg-slate-200 "></div>
                  </div>
                  <div className="w-[100%] bg-white border rounded-2xl space-y-2 p-2 text-[12px]">
                    <div className="">Engagement rate</div>
                    <div className=" h-[10px] animate-pulse rounded-full bg-slate-200  w-full"></div>
                  </div>
                </div>
              </div>
              <div className="items-center w-full pn:max-sm:space-y-2 border-b p-2 relative bg-[#F8FAFC] shadow-sm ">
                <div className="flex items-center justify-between gap-4 w-full">
                  <div className="flex items-center w-[50%] gap-2">
                    <div className="h-[50px] w-[50px] rounded-[18px] border border-dashed flex items-center justify-center">
                      <div className=" bg-contain animate-pulse bg-slate-200 h-[44px] rounded-[16px] w-[44px]" />
                    </div>
                    <div className="font-semibold h-[10px] w-[20%] animate-pulse rounded-full bg-slate-200 text-black"></div>
                  </div>

                  <div className="w-[15%] h-[10px] animate-pulse rounded-full bg-slate-200 pn:max-sm:hidden"></div>
                  <div className="w-[15%] h-[10px] animate-pulse rounded-full bg-slate-200 pn:max-sm:hidden"></div>
                  <div className="w-[15%] h-[10px] animate-pulse rounded-full bg-slate-200 pn:max-sm:hidden"></div>
                  <div className="w-[20%] h-[10px] animate-pulse rounded-full bg-slate-200 pn:max-sm:hidden"></div>
                  <div className="flex justify-center w-3 animate-pulse h-[10px] bg-slate-200 rounded-full"></div>
                </div>
                <div className="grid grid-cols-2 gap-2 items-center sm:hidden justify-between w-full">
                  <div className="w-[100%] bg-white border rounded-2xl space-y-2 p-2 text-[12px]">
                    <div className="">Topics</div>
                    <div className="w-full h-[10px] animate-pulse rounded-full bg-slate-200 text-center"></div>
                  </div>
                  <div className="w-[100%] bg-white border rounded-2xl space-y-2 p-2 text-[12px]">
                    <div className="">Post</div>
                    <div className="w-full  h-[10px] animate-pulse rounded-full bg-slate-200 "></div>
                  </div>
                  <div className="w-[100%] bg-white border rounded-2xl space-y-2 p-2 text-[12px]">
                    <div className="">Member</div>
                    <div className="w-full h-[10px] animate-pulse rounded-full bg-slate-200 "></div>
                  </div>
                  <div className="w-[100%] bg-white border rounded-2xl space-y-2 p-2 text-[12px]">
                    <div className="">Engagement rate</div>
                    <div className=" h-[10px] animate-pulse rounded-full bg-slate-200  w-full"></div>
                  </div>
                </div>
              </div>
              <div className="items-center w-full pn:max-sm:space-y-2 border-b p-2 relative bg-[#F8FAFC] shadow-sm ">
                <div className="flex items-center justify-between gap-4 w-full">
                  <div className="flex items-center w-[50%] gap-2">
                    <div className="h-[50px] w-[50px] rounded-[18px] border border-dashed flex items-center justify-center">
                      <div className=" bg-contain animate-pulse bg-slate-200 h-[44px] rounded-[16px] w-[44px]" />
                    </div>
                    <div className="font-semibold h-[10px] w-[20%] animate-pulse rounded-full bg-slate-200 text-black"></div>
                  </div>

                  <div className="w-[15%] h-[10px] animate-pulse rounded-full bg-slate-200 pn:max-sm:hidden"></div>
                  <div className="w-[15%] h-[10px] animate-pulse rounded-full bg-slate-200 pn:max-sm:hidden"></div>
                  <div className="w-[15%] h-[10px] animate-pulse rounded-full bg-slate-200 pn:max-sm:hidden"></div>
                  <div className="w-[20%] h-[10px] animate-pulse rounded-full bg-slate-200 pn:max-sm:hidden"></div>
                  <div className="flex justify-center w-3 animate-pulse h-[10px] bg-slate-200 rounded-full"></div>
                </div>
                <div className="grid grid-cols-2 gap-2 items-center sm:hidden justify-between w-full">
                  <div className="w-[100%] bg-white border rounded-2xl space-y-2 p-2 text-[12px]">
                    <div className="">Topics</div>
                    <div className="w-full h-[10px] animate-pulse rounded-full bg-slate-200 text-center"></div>
                  </div>
                  <div className="w-[100%] bg-white border rounded-2xl space-y-2 p-2 text-[12px]">
                    <div className="">Post</div>
                    <div className="w-full  h-[10px] animate-pulse rounded-full bg-slate-200 "></div>
                  </div>
                  <div className="w-[100%] bg-white border rounded-2xl space-y-2 p-2 text-[12px]">
                    <div className="">Member</div>
                    <div className="w-full h-[10px] animate-pulse rounded-full bg-slate-200 "></div>
                  </div>
                  <div className="w-[100%] bg-white border rounded-2xl space-y-2 p-2 text-[12px]">
                    <div className="">Engagement rate</div>
                    <div className=" h-[10px] animate-pulse rounded-full bg-slate-200  w-full"></div>
                  </div>
                </div>
              </div>
              <div className="items-center w-full pn:max-sm:space-y-2 border-b p-2 relative bg-[#F8FAFC] shadow-sm ">
                <div className="flex items-center justify-between gap-4 w-full">
                  <div className="flex items-center w-[50%] gap-2">
                    <div className="h-[50px] w-[50px] rounded-[18px] border border-dashed flex items-center justify-center">
                      <div className=" bg-contain animate-pulse bg-slate-200 h-[44px] rounded-[16px] w-[44px]" />
                    </div>
                    <div className="font-semibold h-[10px] w-[20%] animate-pulse rounded-full bg-slate-200 text-black"></div>
                  </div>

                  <div className="w-[15%] h-[10px] animate-pulse rounded-full bg-slate-200 pn:max-sm:hidden"></div>
                  <div className="w-[15%] h-[10px] animate-pulse rounded-full bg-slate-200 pn:max-sm:hidden"></div>
                  <div className="w-[15%] h-[10px] animate-pulse rounded-full bg-slate-200 pn:max-sm:hidden"></div>
                  <div className="w-[20%] h-[10px] animate-pulse rounded-full bg-slate-200 pn:max-sm:hidden"></div>
                  <div className="flex justify-center w-3 animate-pulse h-[10px] bg-slate-200 rounded-full"></div>
                </div>
                <div className="grid grid-cols-2 gap-2 items-center sm:hidden justify-between w-full">
                  <div className="w-[100%] bg-white border rounded-2xl space-y-2 p-2 text-[12px]">
                    <div className="">Topics</div>
                    <div className="w-full h-[10px] animate-pulse rounded-full bg-slate-200 text-center"></div>
                  </div>
                  <div className="w-[100%] bg-white border rounded-2xl space-y-2 p-2 text-[12px]">
                    <div className="">Post</div>
                    <div className="w-full  h-[10px] animate-pulse rounded-full bg-slate-200 "></div>
                  </div>
                  <div className="w-[100%] bg-white border rounded-2xl space-y-2 p-2 text-[12px]">
                    <div className="">Member</div>
                    <div className="w-full h-[10px] animate-pulse rounded-full bg-slate-200 "></div>
                  </div>
                  <div className="w-[100%] bg-white border rounded-2xl space-y-2 p-2 text-[12px]">
                    <div className="">Engagement rate</div>
                    <div className=" h-[10px] animate-pulse rounded-full bg-slate-200  w-full"></div>
                  </div>
                </div>
              </div>
              <div className="items-center w-full pn:max-sm:space-y-2 border-b p-2 relative bg-[#F8FAFC] shadow-sm ">
                <div className="flex items-center justify-between gap-4 w-full">
                  <div className="flex items-center w-[50%] gap-2">
                    <div className="h-[50px] w-[50px] rounded-[18px] border border-dashed flex items-center justify-center">
                      <div className=" bg-contain animate-pulse bg-slate-200 h-[44px] rounded-[16px] w-[44px]" />
                    </div>
                    <div className="font-semibold h-[10px] w-[20%] animate-pulse rounded-full bg-slate-200 text-black"></div>
                  </div>

                  <div className="w-[15%] h-[10px] animate-pulse rounded-full bg-slate-200 pn:max-sm:hidden"></div>
                  <div className="w-[15%] h-[10px] animate-pulse rounded-full bg-slate-200 pn:max-sm:hidden"></div>
                  <div className="w-[15%] h-[10px] animate-pulse rounded-full bg-slate-200 pn:max-sm:hidden"></div>
                  <div className="w-[20%] h-[10px] animate-pulse rounded-full bg-slate-200 pn:max-sm:hidden"></div>
                  <div className="flex justify-center w-3 animate-pulse h-[10px] bg-slate-200 rounded-full"></div>
                </div>
                <div className="grid grid-cols-2 gap-2 items-center sm:hidden justify-between w-full">
                  <div className="w-[100%] bg-white border rounded-2xl space-y-2 p-2 text-[12px]">
                    <div className="">Topics</div>
                    <div className="w-full h-[10px] animate-pulse rounded-full bg-slate-200 text-center"></div>
                  </div>
                  <div className="w-[100%] bg-white border rounded-2xl space-y-2 p-2 text-[12px]">
                    <div className="">Post</div>
                    <div className="w-full  h-[10px] animate-pulse rounded-full bg-slate-200 "></div>
                  </div>
                  <div className="w-[100%] bg-white border rounded-2xl space-y-2 p-2 text-[12px]">
                    <div className="">Member</div>
                    <div className="w-full h-[10px] animate-pulse rounded-full bg-slate-200 "></div>
                  </div>
                  <div className="w-[100%] bg-white border rounded-2xl space-y-2 p-2 text-[12px]">
                    <div className="">Engagement rate</div>
                    <div className=" h-[10px] animate-pulse rounded-full bg-slate-200  w-full"></div>
                  </div>
                </div>
              </div>
              <div className="items-center w-full pn:max-sm:space-y-2 border-b p-2 relative bg-[#F8FAFC] shadow-sm ">
                <div className="flex items-center justify-between gap-4 w-full">
                  <div className="flex items-center w-[50%] gap-2">
                    <div className="h-[50px] w-[50px] rounded-[18px] border border-dashed flex items-center justify-center">
                      <div className=" bg-contain animate-pulse bg-slate-200 h-[44px] rounded-[16px] w-[44px]" />
                    </div>
                    <div className="font-semibold h-[10px] w-[20%] animate-pulse rounded-full bg-slate-200 text-black"></div>
                  </div>

                  <div className="w-[15%] h-[10px] animate-pulse rounded-full bg-slate-200 pn:max-sm:hidden"></div>
                  <div className="w-[15%] h-[10px] animate-pulse rounded-full bg-slate-200 pn:max-sm:hidden"></div>
                  <div className="w-[15%] h-[10px] animate-pulse rounded-full bg-slate-200 pn:max-sm:hidden"></div>
                  <div className="w-[20%] h-[10px] animate-pulse rounded-full bg-slate-200 pn:max-sm:hidden"></div>
                  <div className="flex justify-center w-3 animate-pulse h-[10px] bg-slate-200 rounded-full"></div>
                </div>
                <div className="grid grid-cols-2 gap-2 items-center sm:hidden justify-between w-full">
                  <div className="w-[100%] bg-white border rounded-2xl space-y-2 p-2 text-[12px]">
                    <div className="">Topics</div>
                    <div className="w-full h-[10px] animate-pulse rounded-full bg-slate-200 text-center"></div>
                  </div>
                  <div className="w-[100%] bg-white border rounded-2xl space-y-2 p-2 text-[12px]">
                    <div className="">Post</div>
                    <div className="w-full  h-[10px] animate-pulse rounded-full bg-slate-200 "></div>
                  </div>
                  <div className="w-[100%] bg-white border rounded-2xl space-y-2 p-2 text-[12px]">
                    <div className="">Member</div>
                    <div className="w-full h-[10px] animate-pulse rounded-full bg-slate-200 "></div>
                  </div>
                  {/* <div className="w-[100%] bg-white border rounded-2xl space-y-2 p-2 text-[12px]">
                    <div className="">Engagement rate</div>
                    <div className=" h-[10px] animate-pulse rounded-full bg-slate-200  w-full"></div>
                  </div> */}
                </div>
              </div>
              <div className="items-center w-full pn:max-sm:space-y-2 border-b p-2 relative bg-[#F8FAFC] shadow-sm ">
                <div className="flex items-center justify-between gap-4 w-full">
                  <div className="flex items-center w-[50%] gap-2">
                    <div className="h-[50px] w-[50px] rounded-[18px] border border-dashed flex items-center justify-center">
                      <div className=" bg-contain animate-pulse bg-slate-200 h-[44px] rounded-[16px] w-[44px]" />
                    </div>
                    <div className="font-semibold h-[10px] w-[20%] animate-pulse rounded-full bg-slate-200 text-black"></div>
                  </div>

                  <div className="w-[15%] h-[10px] animate-pulse rounded-full bg-slate-200 pn:max-sm:hidden"></div>
                  <div className="w-[15%] h-[10px] animate-pulse rounded-full bg-slate-200 pn:max-sm:hidden"></div>
                  <div className="w-[15%] h-[10px] animate-pulse rounded-full bg-slate-200 pn:max-sm:hidden"></div>
                  <div className="w-[20%] h-[10px] animate-pulse rounded-full bg-slate-200 pn:max-sm:hidden"></div>
                  <div className="flex justify-center w-3 animate-pulse h-[10px] bg-slate-200 rounded-full"></div>
                </div>
                <div className="grid grid-cols-2 gap-2 items-center sm:hidden justify-between w-full">
                  <div className="w-[100%] bg-white border rounded-2xl space-y-2 p-2 text-[12px]">
                    <div className="">Topics</div>
                    <div className="w-full h-[10px] animate-pulse rounded-full bg-slate-200 text-center"></div>
                  </div>
                  <div className="w-[100%] bg-white border rounded-2xl space-y-2 p-2 text-[12px]">
                    <div className="">Post</div>
                    <div className="w-full  h-[10px] animate-pulse rounded-full bg-slate-200 "></div>
                  </div>
                  <div className="w-[100%] bg-white border rounded-2xl space-y-2 p-2 text-[12px]">
                    <div className="">Member</div>
                    <div className="w-full h-[10px] animate-pulse rounded-full bg-slate-200 "></div>
                  </div>
                  {/* <div className="w-[100%] bg-white border rounded-2xl space-y-2 p-2 text-[12px]">
                    <div className="">Engagement rate</div>
                    <div className=" h-[10px] animate-pulse rounded-full bg-slate-200  w-full"></div>
                  </div> */}
                </div>
              </div>
              <div className="items-center w-full pn:max-sm:space-y-2 border-b p-2 relative bg-[#F8FAFC] shadow-sm ">
                <div className="flex items-center justify-between gap-4 w-full">
                  <div className="flex items-center w-[50%] gap-2">
                    <div className="h-[50px] w-[50px] rounded-[18px] border border-dashed flex items-center justify-center">
                      <div className=" bg-contain animate-pulse bg-slate-200 h-[44px] rounded-[16px] w-[44px]" />
                    </div>
                    <div className="font-semibold h-[10px] w-[20%] animate-pulse rounded-full bg-slate-200 text-black"></div>
                  </div>

                  <div className="w-[15%] h-[10px] animate-pulse rounded-full bg-slate-200 pn:max-sm:hidden"></div>
                  <div className="w-[15%] h-[10px] animate-pulse rounded-full bg-slate-200 pn:max-sm:hidden"></div>
                  <div className="w-[15%] h-[10px] animate-pulse rounded-full bg-slate-200 pn:max-sm:hidden"></div>
                  <div className="w-[20%] h-[10px] animate-pulse rounded-full bg-slate-200 pn:max-sm:hidden"></div>
                  <div className="flex justify-center w-3 animate-pulse h-[10px] bg-slate-200 rounded-full"></div>
                </div>
                <div className="grid grid-cols-2 gap-2 items-center sm:hidden justify-between w-full">
                  <div className="w-[100%] bg-white border rounded-2xl space-y-2 p-2 text-[12px]">
                    <div className="">Topics</div>
                    <div className="w-full h-[10px] animate-pulse rounded-full bg-slate-200 text-center"></div>
                  </div>
                  <div className="w-[100%] bg-white border rounded-2xl space-y-2 p-2 text-[12px]">
                    <div className="">Post</div>
                    <div className="w-full  h-[10px] animate-pulse rounded-full bg-slate-200 "></div>
                  </div>
                  <div className="w-[100%] bg-white border rounded-2xl space-y-2 p-2 text-[12px]">
                    <div className="">Member</div>
                    <div className="w-full h-[10px] animate-pulse rounded-full bg-slate-200 "></div>
                  </div>
                  {/* <div className="w-[100%] bg-white border rounded-2xl space-y-2 p-2 text-[12px]">
                    <div className="">Engagement rate</div>
                    <div className=" h-[10px] animate-pulse rounded-full bg-slate-200  w-full"></div>
                  </div> */}
                </div>
              </div>
            </>
          ) : data?.data?.comdata?.length > 0 ? (
            data?.data?.comdata?.map((d: CommunityData, i: number) => (
              <div
                key={i}
                className=" items-center w-full pn:max-sm:space-y-2 border-b p-2 relative bg-[#F8FAFC] shadow-sm "
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center w-[50%] gap-2">
                    <div className="h-[50px] w-[50px] rounded-[18px] border border-dashed flex items-center justify-center">
                      <img
                        alt="dps"
                        src={d?.dp}
                        className=" bg-contain bg-slate-400 h-[44px] rounded-[16px] w-[44px]"
                      />
                    </div>
                    <div className="font-semibold text-black">
                      {d?.communityName}
                    </div>
                  </div>

                  <div className="w-[20%] text-center text-[12px] pn:max-sm:hidden">
                    {d?.topics?.length >= 2 ? d?.topics?.length : 2}
                  </div>
                  <div className="w-[20%] text-center text-[12px] pn:max-sm:hidden">
                    {/* @ts-expect-error server*/}
                    {d?.topics?.[0]?.postcount ? d?.topics?.[0]?.postcount : 0}
                  </div>
                  <div className="w-[20%] text-center text-[12px] pn:max-sm:hidden">
                    {d?.memberCount}
                  </div>
                  {/* <div className="w-[30%] text-center text-[12px] pn:max-sm:hidden text-green-600">
                    47.59%
                  </div> */}
                  <div
                    onClick={() => {
                      toggleMenu(d._id);
                    }}
                    className="flex justify-center relative"
                  >
                    <BsThreeDotsVertical className="text-gray-500 cursor-pointer" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 items-center sm:hidden justify-between w-full">
                  <div className="w-[100%] bg-white border rounded-2xl space-y-2 p-2 text-[12px]">
                    <div className="">Topics</div>
                    <div className="w-full text-center">
                      {d?.topics?.length}
                    </div>
                  </div>
                  <div className="w-[100%] bg-white border rounded-2xl space-y-2 p-2 text-[12px]">
                    <div className="">Post</div>
                    <div className="w-full text-center">
                      {/* @ts-expect-error server */}
                      {d?.topics[0]?.postcount}
                    </div>
                  </div>
                  <div className="w-[100%] bg-white border rounded-2xl space-y-2 p-2 text-[12px]">
                    <div className="">Member</div>
                    <div className="w-full text-center">{d?.memberCount}</div>
                  </div>
                  {/* <div className="w-[100%] bg-white border rounded-2xl space-y-2 p-2 text-[12px]">
                    <div className="">Engagement rate</div>
                    <div className="text-green-600 text-center w-full">0%</div>
                  </div> */}
                </div>
                {open === true && selectedCommunity === d._id ? (
                  // <div
                  //   onClick={() => setOpen(false)}
                  //   className="absolute w-full bg-[#0f0f0f3d] h-full right-0 bottom-0 z-10"
                  // >
                  <div className=" w-[120px] absolute bg-white right-0 border shadow-lg rounded-2xl py-2 z-10">
                    {/* <Link
                      href={`../main/CreateCommunity?userId=${userId}&comId=${d._id}`}
                      className="w-full px-4 py-2 text-sm hover:bg-gray-100 flex items-center justify-center font-semibold"
                    >
                      Edit
                    </Link> */}
                    <button
                      disabled={loading}
                      onClick={() => deleteCommunity(d._id)} // Pass community ID here
                      className="w-full px-4 py-2 text-sm hover:bg-gray-100 font-semibold"
                    >
                      Delete
                    </button>

                    {(d?.topics as Topics[])
                      ?.filter(
                        (topic: { nature: string }) =>
                          topic.nature === "Posts" || topic.nature === "post"
                      )
                      ?.map((t: Topics, i: number) => (
                        <div
                          key={i}
                          className="w-full flex justify-center items-center"
                        >
                          <Link
                            href={`../main/Post?userId=${userId}&communityId=${d._id}&topicId=${t._id}`}
                            className="w-full text-center px-4 py-2 text-sm hover:bg-gray-100 font-semibold"
                          >
                            {t?.topicName ? t?.topicName : "Posts"}
                          </Link>
                        </div>
                      ))}
                  </div>
                ) : null}
              </div>
            ))
          ) : (
            <div className="w-full flex flex-col h-full gap-2 justify-center items-center">
              <div className="text-slate-500 font-semibold">
                {" "}
                No Community Created
              </div>
            </div>
          )}
        </div>
      </div>
    </>
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
