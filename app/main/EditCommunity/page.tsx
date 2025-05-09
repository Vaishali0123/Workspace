"use client";
import { API, errorHandler } from "@/app/utils/helpers";
import axios from "axios";
import React, { Suspense, useState } from "react";
import { useAuthContext } from "@/app/Auth/Components/auth";
import { HiOutlineLockClosed } from "react-icons/hi";
import toast, { Toaster } from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { RiLoaderLine } from "../../utils/comimports";
import LoadingSkeleton from "../Components/LoadingSkeleton";
interface Topic {
  topicName: string;
  description: string;
  nature: string;
  topicType: string;
  validity: string;
  price: number;
}
const EditCommunityForm = () => {
  const search = useSearchParams();
  const [topicName, setTopicName] = useState<string>("");
  const [topicDescription, setTopicDescription] = useState<string>("");
  const [selectTopicnature, setSelectTopicnature] = useState<string>("Posts");
  const [topicType, setTopicType] = useState<string>("Free");
  const comdatastring = search.get("comdata");
  const comdata = comdatastring ? JSON.parse(comdatastring) : null;
  const [communityName, setCommunityName] = useState<string>(
    comdata?.communityName
  );
  const [price, setPrice] = useState(0);
  const comId = search.get("comId");
  const [communityDescription, setCommunityDescription] = useState<string>(
    comdata?.desc
  );

  const [communityImage, setCommunityImage] = useState<File | null>(null);
  const [showCreateTopicPopup, setShowCreateTopicPopup] = useState(false);
  const [validity, setValidity] = useState("1 Month");
  const [loading, setLoading] = useState("load");
  const { data } = useAuthContext();

  const router = useRouter();
  const editcom = async () => {
    if (!communityName && !communityImage && !communityDescription)
      return toast.error("No Changes Identified!");
    setLoading("true");
    try {
      const formData = new FormData();
      formData.append("communityName", communityName);
      formData.append("desc", communityDescription);
      if (communityImage) {
        formData.append("dp", communityImage);
      }
      const res = await axios.post(
        `${API}/updatecom/${data?.id}/${comdata?._id}`,
        formData
      );
      if (res.status === 200) {
        toast.success("Successfully Community Created");
        router.back();
      }
    } catch (error) {
      errorHandler(error);
    }
    setLoading("false");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof window !== "undefined") {
      const file = e.target.files?.[0];
      if (file) {
        if (!file.type.startsWith("image/")) {
          toast.error("Only image files are allowed!");
          return;
        }

        // setComImage(file);
        setCommunityImage(file);
      }
    }
  };

  const createTopic = async () => {
    setLoading("topicload");
    try {
      if (!topicName || !topicDescription || !selectTopicnature || !validity) {
        toast.error("Fill all the details!");
        setLoading("topicdone");
        return;
      }
      const formdata = new FormData();
      formdata.append("topicName", topicName);
      formdata.append("description", topicDescription);
      formdata.append("nature", selectTopicnature);
      formdata.append("topicType", topicType);
      formdata.append("validity", validity);
      formdata.append("price", price.toString());

      const res = await axios.post(`${API}/createTopic/${data?.id}/${comId}`, {
        topicName: topicName,
        description: topicDescription,
        nature: selectTopicnature,
        topicType: topicType,
        validity: validity,
        price: price,
      });
      if (res.status === 200) {
        setLoading("topicdone");
        toast.success("Successfully Topic Created");

        setShowCreateTopicPopup(false);
        setTopicName("");
        setTopicDescription("");
        setSelectTopicnature("");
        setTopicType("");
        setValidity("");
        setPrice(0);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error creating Topic:", error.response || error.message);
      } else {
        console.error("Error creating Topic:", error);
      }
      toast.error("Failed to create Topic");
    }
    setLoading("topicdone");
  };

  return (
    <div className="h-full  sm:overflow-hidden  space-y-2 ">
      <Toaster />
      <div className="h-[60px] w-full p-2 flex justify-between items-center bg-white border rounded-xl">
        <div className="flex items-center justify-between w-full">
          <div className="text-[20px] font-semibold text-slate-500">
            Edit Community
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                router.back();
              }}
              className="flex px-4 p-2 text-[14px] items-center justify-center rounded-xl"
            >
              Discard
            </button>
            {loading === "true" ? (
              <div className="flex px-4 p-2 text-[14px] bg-blue-600 text-white items-center justify-center rounded-xl">
                <RiLoaderLine size={20} className="animate-spin" />
              </div>
            ) : (
              <button
                disabled={loading === "true"}
                onClick={() => {
                  if (data?.id) {
                    editcom();
                  }
                }}
                className="flex px-4 p-2 text-[14px] bg-blue-600 text-white items-center justify-center rounded-xl"
              >
                <div>Save</div>
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="h-[calc(98%-60px)] border  rounded-2xl overflow-hidden relative">
        {/* header  */}

        <div className="p-4  ">
          <div className="py-2  flex-col flex w-full items-center gap-2 justify-center font-semibold text-[12px]">
            <label
              htmlFor="comdp"
              className="h-[80px] w-[80px] cursor-pointer border bg-white hover:opacity-80 active:opacity-80 flex rounded-[32px] justify-center items-center "
            >
              {communityImage instanceof File ? (
                <img
                  src={URL.createObjectURL(communityImage)}
                  alt="Community Logo"
                  className="h-[80px] w-[80px] object-cover  border rounded-[32px]"
                />
              ) : (
                <img
                  src={comdata?.dp}
                  alt="Community Logo"
                  className="h-[80px] w-[80px] object-cover  border rounded-[32px]"
                />
              )}
            </label>
            {/* Display Image Preview */}
            {/* File Input */}
            <input
              type="file"
              id="comdp"
              accept="image/*"
              onChange={handleImageChange}
              className="p-2 hidden  border  rounded-3xl text-[14px] font-normal text-center "
            />
            <label
              htmlFor="comdp"
              className="text-[12px] text-blue-600 hover:text-blue-400 active:text-blue-500 cursor-pointer"
            >
              Edit Picture
            </label>
          </div>

          <div className=" h-[calc(100%-150px)] flex">
            {/* left side */}
            <div className="flex flex-col gap-2 h-full w-[80%] items-center">
              {/* name  */}
              <div className="w-full space-y-1 ">
                <div className="text-[14px] text-[#667085]">Community Name</div>
                <input
                  value={communityName}
                  onChange={
                    (e) => setCommunityName(e.target.value)
                    // dispatch(setCommunity({ communityName: e.target.value }))
                  }
                  type="text"
                  placeholder="Community Name"
                  className="p-1 w-full border outline-none rounded-lg"
                />
              </div>
              {/* desc  */}
              <div className="w-full ">
                <div className="flex space-y-1 justify-between items-center">
                  <div className="text-[14px] text-[#667085]">
                    Community Description
                  </div>
                  {/* <div className="text-[14px] text-[#667085]">
                    ({comdata?.desc.length()}/100)
                  </div> */}
                </div>
                <textarea
                  maxLength={100}
                  value={communityDescription}
                  onChange={(e) => setCommunityDescription(e.target.value)}
                  placeholder="Write Community Description...."
                  className="p-1 w-full outline-none  border rounded-lg"
                />
              </div>
              {/* cat  */}
              <div className="w-full text-[14px]  space-y-1 text-[#667085]">
                <div className="text-[14px] text-[#667085]">Category</div>
                <div className="p-2 px-4 w-fit z-20 border bg-white rounded-lg text-center">
                  {comdata?.category}
                </div>
              </div>
              <div className="w-full space-y-1">
                <div className="text-[14px] text-[#667085]">Community Type</div>

                <div className="w-full   bg-white border rounded-xl flex p-2 items-center gap-2">
                  <div
                    className={`h-[20px] w-[20px] rounded-full duration-75 border-2 flex items-center justify-center border-[#3af]`}
                  >
                    <div
                      className={`h-[12px] w-[12px] opacity-2 rounded-full duration-75 bg-[#3af]`}
                    ></div>
                  </div>
                  <div>
                    <div className="text-[14px] font-semibold text-[#474747]">
                      {comdata?.type?.toLowerCase() === "public"
                        ? "Public"
                        : "Private"}{" "}
                      Community
                    </div>
                    <div className="text-[14px] text-[#667085]">
                      Can be found in search, everyone can join
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* right side */}
            <div className="flex flex-col gap-2 h-full w-full items-center">
              <div className="flex flex-col gap-2 h-full w-[80%]">
                {/* topic */}
                <div className="w-full space-y-1 text-[14px] text-[#667085]">
                  <div className="text-[14px] text-[#667085]">Topics</div>
                  <div className="flex gap-2">
                    {comdata?.topics?.map((item: Topic, index: number) => (
                      <div
                        key={index}
                        className="p-2 border px-4 rounded-xl text-center"
                      >
                        {item?.topicName}
                      </div>
                    ))}
                    <div className="relative inline-block group">
                      <button
                        disabled={
                          (data?.memberships === "Free" &&
                            comdata?.topics?.length >= 2) ||
                          (data?.memberships === "Pro" &&
                            comdata?.topics?.length >= 5) ||
                          (data?.memberships === "Plus" &&
                            comdata?.topics?.length >= 3) ||
                          (data?.memberships === "Premium" &&
                            comdata?.topics?.length >= 10)
                        }
                        onClick={() => setShowCreateTopicPopup(true)}
                        className="p-2 border px-4 rounded-xl bg-blue-600 disabled:cursor-not-allowed flex items-center gap-2 text-white text-center"
                      >
                        {comId === "" ? <HiOutlineLockClosed /> : "+"} Add
                        {/* Tooltip when disabled */}
                        {((data?.memberships === "Free" &&
                          comdata?.topics?.length >= 2) ||
                          (data?.memberships === "Pro" &&
                            comdata?.topics?.length >= 5) ||
                          (data?.memberships === "Plus" &&
                            comdata?.topics?.length >= 3) ||
                          (data?.memberships === "Premium" &&
                            comdata?.topics?.length >= 10)) && (
                          <div
                            className="top-full mt-2 left-1/2 -translate-x-1/2 absolute bg-slate-100 border-1 text-black text-xs p-2 rounded shadow-lg 
                          opacity-0 group-hover:opacity-100 transition pointer-events-none w-[220px] text-center z-50"
                          >
                            Currently, as per your membership plan, you can&apos;t
                            create more topics. Upgrade your plan to continue.
                          </div>
                        )}
                      </button>
                    </div>
                    {/* Create Topic  */}
                    {showCreateTopicPopup && (
                      <div className="fixed inset-0 bg-[#1717170d] backdrop-blur-sm z-30 flex justify-center items-center">
                        <div className="bg-white w-[90%] max-w-[400px] rounded-2xl p-6 relative">
                          <h2 className="text-[18px] font-semibold mb-6 text-center">
                            Create Topic
                          </h2>

                          <div className="mb-4">
                            <label className="text-[14px] mb-2 block">
                              Topic Name
                            </label>
                            <input
                              type="text"
                              value={topicName}
                              onChange={(e) => setTopicName(e.target.value)}
                              placeholder="Ex: Java Courses"
                              className="w-full bg-[#f6f8fd] text-[14px] rounded-xl p-3 outline-none"
                            />
                          </div>
                          {/* Description */}
                          <div className="mb-4">
                            <label className="text-[14px] mb-2 block">
                              Enter Welcome Message
                            </label>
                            <input
                              type="text"
                              value={topicDescription}
                              onChange={(e) =>
                                setTopicDescription(e.target.value)
                              }
                              placeholder="Description"
                              className="w-full bg-[#f6f8fd] text-[14px] rounded-xl p-3 outline-none"
                            />
                          </div>
                          {/* Topic Nature */}
                          <div className="w-full mb-4 space-y-1">
                            <div className="text-[14px] text-[#667085]">
                              Select Topic Nature
                            </div>
                            <div className="flex gap-2">
                              {/* Topic type 1  */}
                              <div
                                onClick={() => setSelectTopicnature("Posts")}
                                className="w-fit bg-white border rounded-xl flex p-2 items-center gap-2"
                              >
                                <div
                                  className={`h-[20px] w-[20px] rounded-full duration-75 border-2 flex items-center justify-center ${
                                    selectTopicnature === "Posts"
                                      ? "border-[#3af]"
                                      : ""
                                  }`}
                                >
                                  <div
                                    className={`h-[12px] w-[12px] rounded-full duration-75 ${
                                      selectTopicnature === "Posts"
                                        ? "bg-[#3af]"
                                        : "bg-white"
                                    }`}
                                  ></div>
                                </div>
                                <div>
                                  <div className="text-[14px] font-semibold text-[#474747]">
                                    Posts
                                  </div>
                                </div>
                              </div>
                              {/* Topic type 2  */}
                              <div
                                onClick={() => setSelectTopicnature("Chats")}
                                className="w-fit bg-white border rounded-xl flex p-2 items-center gap-2"
                              >
                                <div
                                  className={`h-[20px] w-[20px] rounded-full duration-75 border-2 flex items-center justify-center ${
                                    topicType === "Paid" ? "border-[#3af]" : ""
                                  }`}
                                >
                                  <div
                                    className={`h-[12px] w-[12px] rounded-full duration-75 ${
                                      selectTopicnature === "Chats"
                                        ? "bg-[#3af]"
                                        : "bg-white"
                                    }`}
                                  ></div>
                                </div>
                                <div>
                                  <div className="text-[14px] font-semibold text-[#474747]">
                                    Chats
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* Topic type */}
                          <div className="w-full mb-4 space-y-1">
                            <div className="text-[14px] text-[#667085]">
                              Select Topic Type
                            </div>
                            <div className="flex gap-2">
                              {/* Topic type 1  */}
                              <div
                                onClick={() => setTopicType("Free")}
                                className="w-fit bg-white border rounded-xl flex p-2 items-center gap-2"
                              >
                                <div
                                  className={`h-[20px] w-[20px] rounded-full duration-75 border-2 flex items-center justify-center ${
                                    topicType === "Free" ? "border-[#3af]" : ""
                                  }`}
                                >
                                  <div
                                    className={`h-[12px] w-[12px] rounded-full duration-75 ${
                                      topicType === "Free"
                                        ? "bg-[#3af]"
                                        : "bg-white"
                                    }`}
                                  ></div>
                                </div>
                                <div>
                                  <div className="text-[14px] font-semibold text-[#474747]">
                                    Free
                                  </div>
                                </div>
                              </div>
                              {/* Topic type 2  */}
                              <div
                                onClick={() => setTopicType("Paid")}
                                className="w-fit bg-white border rounded-xl flex p-2 items-center gap-2"
                              >
                                <div
                                  className={`h-[20px] w-[20px] rounded-full duration-75 border-2 flex items-center justify-center ${
                                    topicType === "Paid" ? "border-[#3af]" : ""
                                  }`}
                                >
                                  <div
                                    className={`h-[12px] w-[12px] rounded-full duration-75 ${
                                      topicType === "Paid"
                                        ? "bg-[#3af]"
                                        : "bg-white"
                                    }`}
                                  ></div>
                                </div>
                                <div>
                                  <div className="text-[14px] font-semibold text-[#474747]">
                                    Paid
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* Price */}
                          <div className="mb-6">
                            <label className="text-[14px] mb-2 block">
                              Price (INR)
                            </label>
                            <div className="flex gap-2">
                              <input
                                min={topicType === "Free" ? 0 : 1}
                                type="number"
                                value={price ? price : 0}
                                onChange={(e) =>
                                  setPrice(e.target.valueAsNumber)
                                }
                                placeholder="150"
                                className="w-full bg-[#f6f8fd] text-[14px] rounded-xl p-3 outline-none"
                              />
                              <select
                                value={validity}
                                onChange={(e) => setValidity(e.target.value)}
                                className="bg-[#f6f8fd] text-[14px] rounded-xl p-3 outline-none w-full"
                              >
                                <option value="1 Day">One Day</option>
                                <option value="1 Month">Monthly</option>
                                <option value="1 Year">Yearly</option>
                              </select>
                            </div>
                          </div>

                          <button
                            disabled={loading === "topicload"}
                            onClick={createTopic}
                            className="w-full bg-[#fecf4d] text-black rounded-xl py-3 text-[14px] font-medium"
                          >
                            {loading === "topicload"
                              ? "Creating Topic.."
                              : "Done"}
                          </button>

                          <div
                            onClick={() => setShowCreateTopicPopup(false)}
                            className="absolute top-3 right-3 text-gray-500 text-[20px] cursor-pointer"
                          >
                            ✕
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const Page = () => {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <EditCommunityForm />
    </Suspense>
  );
};
export default Page;
