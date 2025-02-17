"use client";
import { setCommunity } from "@/app/redux/slices/communitySlice";
import { RootState } from "@/app/redux/store";
import { API } from "@/app/utils/helpers";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useAuthContext } from "@/app/Auth/Components/auth";
import { HiOutlineLockClosed } from "react-icons/hi";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Page = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [select, setSelect] = useState<boolean>(false);
  const [topicName, setTopicName] = useState<string>("");
  const [topicDescription, setTopicDescription] = useState<string>("");
  const [selectTopic, setSelectTopic] = useState<string>("");
  const [topicType, setTopicType] = useState<string>("Free");
  const [communityName, setCommunityName] = useState<string>("");
  const [comId, setComId] = useState("");
  const [communityDescription, setCommunityDescription] = useState<string>("");
  const [communityCategory, setCommunityCategory] = useState<string>("");
  const [communityType, setCommunityType] = useState<string>("public");
  const [communityImage, setCommunityImage] = useState<File | null>(null);
  const [dp, setDp] = useState<File | null>(null);

  const { data } = useAuthContext();
  const userId = data?.id;
  const communities = [
    { category: "Tech" },
    { category: "Health" },
    { category: "Education" },
    { category: "Gaming" },
    { category: "Health" },
    { category: "Food" },
    { category: "Entertainment" },
    { category: "Songs & Music" },
    { category: "Education" },
    { category: "Tech" },
    { category: "Health" },
    { category: "Education" },
    { category: "Tech" },
    { category: "Health" },
    { category: "Education" },
  ];

  const router = useRouter();

  const createCommunity = async () => {
    try {
      const formData = new FormData();
      formData.append("communityName", communityName);
      formData.append("category", communityCategory);
      formData.append("desc", communityDescription);
      formData.append("type", communityType);
      formData.append("dp", communityImage);
      console.log("FormData:", formData);
      const res = await axios.post(
        `${API}/createcommunity/${data?.id}`,
        formData
      );
      if (res.status === 200) {
        toast.success("Successfully Community Created");
        router.push("/main/Community");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Error creating community:",
          error.response || error.message
        );
      } else {
        console.error("Error creating community:", error);
      }
      toast.error("Failed to create community");
    }
  };
  const Topices = [{ selectTopic: "Post" }, { selectTopic: "All" }];

  const [comImage, setComImage] = useState<File | null>(null);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Only image files are allowed!");
        return;
      }
      setDp(file);
      setComImage(file);
      setCommunityImage(file);
    }
  };

  // const createTopic = async () => {
  //   try {
  //     const formdata = new FormData();
  //     formdata.append("topicName", topicName);
  //     formdata.append("description", topicDescription);
  //     formdata.append("nature", selectTopic);
  //     formdata.append("topicType", topicType);
  //     const res = await axios.post(
  //       `${API}/createtopic/${comId}/${data._id}`,
  //       formdata
  //     );
  //     if (res.status === 200) {
  //       toast.success("Successfully Topic Created");
  //     }
  //   } catch (error) {
  //     if (axios.isAxiosError(error)) {
  //       console.error("Error creating Topic:", error.response || error.message);
  //     } else {
  //       console.error("Error creating Topic:", error);
  //     }
  //     toast.error("Failed to create Topic");
  //   }
  // };

  return (
    <div className="h-full space-y-2 ">
      <div className="h-[60px] w-full p-2 flex justify-between items-center bg-white border rounded-xl">
        <div className="flex items-center justify-between w-full">
          <div className="text-[20px] font-semibold text-slate-500">
            Create Community
          </div>
          <div className="flex items-center gap-2">
            <Link
              href={"../main/Community"}
              className="flex px-4 p-2 text-[14px] items-center justify-center rounded-xl"
            >
              Discard
            </Link>
            <div className="flex px-4 p-2 text-[14px] bg-blue-600 text-white items-center justify-center rounded-xl">
              <div onClick={createCommunity}> Create</div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[calc(98%-60px)] bg-white border rounded-2xl overflow-hidden relative">
        {/* header  */}
        <div
          className={`${
            open === true
              ? " absolute h-full w-full flex items-center justify-center bg-[#1717170c]"
              : "hidden"
          }`}
        >
          <div className="bg-white p-4 border  max-w-[300px] flex-wrap flex gap-2 rounded-2xl">
            {communities.map((item, index) => (
              <div
                onClick={() => {
                  setCommunityCategory(item.category);
                  setOpen(false);
                }}
                key={index}
                className={`text-[14px] p-2 px-4 rounded-2xl border hover:bg-slate-50 select-none cursor-pointer ${
                  communityCategory === item.category
                    ? "bg-[#f1f4f9] text-[#667085]"
                    : ""
                }`}
              >
                {item.category}
              </div>
            ))}
          </div>
        </div>
        <div className="p-4 ">
          <div className="h-[100px] flex w-full items-center gap-2 justify-center">
            <div className="h-[80px] w-[80px] border rounded-3xl">
              {communityImage instanceof File && (
                <img
                  src={URL.createObjectURL(dp)}
                  alt="Community Logo"
                  className="h-[80px] w-[80px] border rounded-3xl"
                />
              )}
            </div>
            {/* Display Image Preview */}
            {/* File Input */}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="p-2 px-4 border rounded-3xl text-[14px]"
            />
            Upload image
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
                  className="p-1 w-full border rounded-lg"
                />
              </div>
              {/* desc  */}
              <div className="w-full ">
                <div className="flex space-y-1 justify-between items-center">
                  <div className="text-[14px] text-[#667085]">
                    Community Description
                  </div>
                  <div className="text-[14px] text-[#667085]">
                    ({communityDescription.length}/100)
                  </div>
                </div>
                <textarea
                  maxLength={100}
                  value={communityDescription}
                  onChange={(e) => setCommunityDescription(e.target.value)}
                  placeholder="write your Description...."
                  className="p-1 w-full border rounded-lg"
                />
              </div>
              {/* cat  */}
              <div className="w-full text-[14px] space-y-1 text-[#667085]">
                <div className="text-[14px] text-[#667085]">Category</div>
                <div
                  onClick={() => setOpen(true)}
                  className="p-2 px-4 w-fit border rounded-lg text-center"
                >
                  {communityCategory ? communityCategory : "Select Category"}
                </div>
              </div>
              <div className="w-full space-y-1">
                <div className="text-[14px] text-[#667085]">
                  Select Community Type
                </div>
                {/* Community type 1  */}
                <div
                  onClick={() => setCommunityType("private")}
                  className="w-full bg-white border rounded-xl flex p-2 items-center gap-2"
                >
                  <div
                    className={`h-[20px] w-[20px] rounded-full duration-75 border-2 flex items-center justify-center ${
                      communityType === "private" ? "border-[#3af]" : ""
                    }`}
                  >
                    <div
                      className={`h-[12px] w-[12px] rounded-full duration-75 ${
                        communityType === "private" ? "bg-[#3af]" : "bg-white"
                      }`}
                    ></div>
                  </div>
                  <div>
                    <div className="text-[14px] font-semibold text-[#474747]">
                      Private Community
                    </div>
                    <div className="text-[14px] text-[#667085]">
                      Can only be joined by invite links
                    </div>
                  </div>
                </div>
                {/* Community type 2  */}
                <div
                  onClick={() => setCommunityType("public")}
                  className="w-full bg-white border rounded-xl flex p-2 items-center gap-2"
                >
                  <div
                    className={`h-[20px] w-[20px] rounded-full duration-75 border-2 flex items-center justify-center ${
                      communityType === "public" ? "border-[#3af]" : ""
                    }`}
                  >
                    <div
                      className={`h-[12px] w-[12px] rounded-full duration-75 ${
                        communityType === "public" ? "bg-[#3af]" : "bg-white"
                      }`}
                    ></div>
                  </div>
                  <div>
                    <div className="text-[14px] font-semibold text-[#474747]">
                      Public Community
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
                    <div className="p-2 border px-4 rounded-xl text-center">
                      Posts
                    </div>
                    <div className="p-2 border px-4 rounded-xl text-center">
                      All
                    </div>

                    <div
                      onClick={() => setOpen(!open)}
                      className="p-2 border px-4 rounded-xl bg-blue-600 flex items-center gap-2 text-white text-center"
                    >
                      {comId === "" ? <HiOutlineLockClosed /> : "+"} Add
                    </div>
                  </div>
                </div>
                {comId === "" ? (
                  <div className="p-2 w-[60%] text-[14px] text-[#667085] border space-y-2 rounded-xl">
                    <div>
                      To from a topic on this community you have get 150 members
                      on it
                    </div>
                    <div className="space-y-1 w-full">
                      <div className="flex justify-between text-[#666] font-semibold">
                        <div className="text-[12px]">Memder</div>
                        <div className="text-[12px]">0/150</div>
                      </div>
                      <div className="relative w-full h-[10px] bg-gray-100 rounded-full">
                        <div className="absolute top-0 left-0 h-full w-[70%] bg-blue-400 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    {/* name  */}
                    <div className="w-full space-y-1 ">
                      <div className="text-[14px] text-[#667085]">
                        Topic Name
                      </div>
                      <input
                        value={topicName}
                        onChange={(e) => setTopicName(e.target.value)}
                        type="text"
                        placeholder="Topic Name"
                        className="p-1 w-full border rounded-lg"
                      />
                    </div>
                    {/* desc  */}
                    <div className="w-full ">
                      <div className="flex space-y-1 justify-between items-center">
                        <div className="text-[14px] text-[#667085]">
                          Topic Description
                        </div>
                        <div className="text-[14px] text-[#667085]">
                          ({topicDescription.length}/100)
                        </div>
                      </div>
                      <textarea
                        maxLength={100}
                        value={topicDescription}
                        onChange={(e) => setTopicDescription(e.target.value)}
                        placeholder="write your Description...."
                        className="p-1 w-full border rounded-lg"
                      />
                    </div>
                    {/* Topic type  */}
                    <div className="w-full text-[14px] select-none space-y-1 text-[#667085]">
                      <div className="text-[14px]  text-[#667085]">
                        Select topic type
                      </div>
                      <div
                        onClick={() => setSelect(true)}
                        className="w-fit border rounded-lg text-center"
                      >
                        <div
                          className={`p-2 text-center cursor-pointer ${
                            select === true ? " border-b " : ""
                          }`}
                        >
                          {selectTopic ? selectTopic : "Select Topic Type "}
                        </div>
                        {Topices.map((item, index) => (
                          <div
                            key={index}
                            className={`${
                              select === true
                                ? "w-full"
                                : "w-[0%] text-[0px] opacity-0 hidden"
                            }`}
                          >
                            <div
                              onClick={() => {
                                setSelectTopic(item.selectTopic);
                                setSelect(false);
                              }}
                              className={`cursor-pointer hover:bg-slate-50 text-center  ${
                                select === true ? "p-2" : " p-0"
                              }`}
                            >
                              {item.selectTopic}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="w-full space-y-1">
                      <div className="text-[14px] text-[#667085]">
                        Select topic type
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
                                topicType === "Free" ? "bg-[#3af]" : "bg-white"
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
                                topicType === "Paid" ? "bg-[#3af]" : "bg-white"
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
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
