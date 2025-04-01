"use client";

import React, { Suspense, useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import axios from "axios";
import { API } from "@/app/utils/helpers";
import toast, { Toaster } from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

interface Post {
  type: string;
  content: string;
  thumbnail?: string;
}

interface PostData {
  _id: string;
  title: string;
  description: string;
  likes: number;
  commentcount: number;
  analytics: { views: number }[];
  post: Post[];
}

const PageContent: React.FC = () => {
  const searchParams = useSearchParams();
  const communityId = searchParams.get("communityId");
  const topicId = searchParams.get("topicId");
  const userId = searchParams.get("userId");
  const [postData, setPostData] = useState<PostData[]>([]);

  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (communityId && topicId) {
      fetchPosts();
    }
  }, [communityId]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API}/getpost/${communityId}/${topicId}`
      );

      if (response.data?.success) {
        setPostData(response.data.posts);
      }
    } catch (err) {
      console.error("Error fetching posts", err);
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (postId: string) => {
    if (!postId) return; // Prevent unnecessary API calls

    setLoading(true);
    // setError("");

    try {
      const res = await axios.post(
        `${API}/deletepost/${userId}/${communityId}/${topicId}/${postId}`
      );
      // Optimistically update UI
      setPostData((prevData) => prevData.filter((post) => post._id !== postId));

      toast.success(res?.data.message || "Post deleted successfully");
    } catch (error: unknown) {
      let errorMsg = "Failed to delete post";

      if (axios.isAxiosError(error) && error.response?.data?.message) {
        errorMsg = error.response.data.message;
      }
      toast.error(errorMsg);
    } finally {
      setLoading(false);
      setSelectedPost(null);
    }
  };

  return (
    <>
      <Toaster />
      <div className="flex flex-col sm:mb-0 items-center space-y-2 sm:rounded-xl w-full h-full">
        {/* header  */}
        <div className="flex  border rounded-2xl justify-between bg-white h-[60px] w-full items-center p-2">
          <div className="flex justify-center items-center gap-4">
            <div className="flex flex-col">
              <div className="text-[16px] font-semibold">Post On Grovyo</div>
            </div>
          </div>
          <div className="flex justify-center text-[14px] font-medium items-center gap-2">
            <Link
              href={`/main/CreatePost?userId=${userId}&communityId=${communityId}&topicId=${topicId}`}
              className="bg-[#4880FF] cursor-pointer font-medium text-white p-2 px-4 pp:px-7 rounded-xl"
            >
              Create Post
            </Link>
          </div>
        </div>
        <div className=" sm:rounded-2xl overflow-auto relative sm:border h-full w-full pn:max-sm:h-[calc(100vh - 50px)] overflow-hidden sm:bg-white">
          {/* header  */}
          <div className="font-semibold text-[15px] h-[50px] tracking-tighter flex p-3 items-center w-full pn:max-sm:hidden rounded-t-xl bg-[#F1F4F9]">
            <div className="w-[50%]">Posts</div>
            <div className="w-[20%] text-center">Applause</div>
            <div className="w-[20%] text-center">Views</div>
            <div className="w-[20%] text-center">Comments</div>
            <div className="w-[30%] text-center">Engagement Rate</div>
            <div className="flex justify-center w-5 relative"></div>
          </div>
          <div className="h-[calc(100%-50px)] w-full overflow-auto">
            {/* loading  */}
            {loading ? (
              <>
                <div className=" items-center w-full pn:max-sm:space-y-2 border-b p-2 relative bg-[#ffffff] shadow-sm ">
                  <div className="flex items-center gap-4 justify-between w-full">
                    <div className="flex items-center w-[50%] gap-2">
                      <div className="h-[100px] w-[100px] rounded-[4px] border border-dashed flex items-center justify-center">
                        <div className=" bg-contain animate-pulse bg-slate-400 h-[94px] rounded-[4px] w-[94px]" />
                      </div>
                      <div className="flex flex-col">
                        <div className="font-semibold w-[40%] h-[14px] animate-pulse rounded-full bg-slate-200 "></div>
                        <div className="font-medium  w-[25%] h-[10px] animate-pulse rounded-full bg-slate-200"></div>
                      </div>
                    </div>

                    <div className="w-[15%] h-[10px] animate-pulse rounded-full bg-slate-200  pn:max-sm:hidden"></div>
                    <div className="w-[15%] h-[10px] animate-pulse rounded-full bg-slate-200  pn:max-sm:hidden"></div>
                    <div className="w-[15%] h-[10px] animate-pulse rounded-full bg-slate-200  pn:max-sm:hidden"></div>
                    <div className="w-[20%] h-[10px] animate-pulse rounded-full bg-slate-200  pn:max-sm:hidden"></div>
                    <div className="flex justify-center w-3 animate-pulse h-[10px] bg-slate-200 rounded-full"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 items-center sm:hidden justify-between w-full">
                    <div className="w-[100%] bg-white border rounded-2xl space-y-2 p-2 text-[12px]">
                      <div className="">Topics</div>
                      <div className="w-full h-[10px] animate-pulse rounded-full bg-slate-200 text-center"></div>
                    </div>
                    <div className="w-[100%] bg-white border rounded-2xl space-y-2 p-2 text-[12px]">
                      <div className="">Post</div>
                      <div className="w-full h-[10px] animate-pulse rounded-full bg-slate-200 text-center"></div>
                    </div>
                    <div className="w-[100%] bg-white border rounded-2xl space-y-2 p-2 text-[12px]">
                      <div className="">Member</div>
                      <div className="w-full h-[10px] animate-pulse rounded-full bg-slate-200 text-center"></div>
                    </div>
                    <div className="w-[100%] bg-white border rounded-2xl space-y-2 p-2 text-[12px]">
                      <div className="">Engagement rate</div>
                      <div className="w-full h-[10px] animate-pulse rounded-full bg-slate-200 text-center"></div>
                    </div>
                  </div>
                </div>
                <div className=" items-center w-full pn:max-sm:space-y-2 border-b p-2 relative bg-[#ffffff] shadow-sm ">
                  <div className="flex items-center gap-4 justify-between w-full">
                    <div className="flex items-center w-[50%] gap-2">
                      <div className="h-[100px] w-[100px] rounded-[4px] border border-dashed flex items-center justify-center">
                        <div className=" bg-contain animate-pulse bg-slate-400 h-[94px] rounded-[4px] w-[94px]" />
                      </div>
                      <div className="flex flex-col">
                        <div className="font-semibold w-[40%] h-[14px] animate-pulse rounded-full bg-slate-200 "></div>
                        <div className="font-medium  w-[25%] h-[10px] animate-pulse rounded-full bg-slate-200"></div>
                      </div>
                    </div>

                    <div className="w-[15%] h-[10px] animate-pulse rounded-full bg-slate-200  pn:max-sm:hidden"></div>
                    <div className="w-[15%] h-[10px] animate-pulse rounded-full bg-slate-200  pn:max-sm:hidden"></div>
                    <div className="w-[15%] h-[10px] animate-pulse rounded-full bg-slate-200  pn:max-sm:hidden"></div>
                    <div className="w-[20%] h-[10px] animate-pulse rounded-full bg-slate-200  pn:max-sm:hidden"></div>
                    <div className="flex justify-center w-3 animate-pulse h-[10px] bg-slate-200 rounded-full"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 items-center sm:hidden justify-between w-full">
                    <div className="w-[100%] bg-white border rounded-2xl space-y-2 p-2 text-[12px]">
                      <div className="">Topics</div>
                      <div className="w-full h-[10px] animate-pulse rounded-full bg-slate-200 text-center"></div>
                    </div>
                    <div className="w-[100%] bg-white border rounded-2xl space-y-2 p-2 text-[12px]">
                      <div className="">Post</div>
                      <div className="w-full h-[10px] animate-pulse rounded-full bg-slate-200 text-center"></div>
                    </div>
                    <div className="w-[100%] bg-white border rounded-2xl space-y-2 p-2 text-[12px]">
                      <div className="">Member</div>
                      <div className="w-full h-[10px] animate-pulse rounded-full bg-slate-200 text-center"></div>
                    </div>
                    <div className="w-[100%] bg-white border rounded-2xl space-y-2 p-2 text-[12px]">
                      <div className="">Engagement rate</div>
                      <div className="w-full h-[10px] animate-pulse rounded-full bg-slate-200 text-center"></div>
                    </div>
                  </div>
                </div>
                <div className=" items-center w-full pn:max-sm:space-y-2 border-b p-2 relative bg-[#ffffff] shadow-sm ">
                  <div className="flex items-center gap-4 justify-between w-full">
                    <div className="flex items-center w-[50%] gap-2">
                      <div className="h-[100px] w-[100px] rounded-[4px] border border-dashed flex items-center justify-center">
                        <div className=" bg-contain animate-pulse bg-slate-400 h-[94px] rounded-[4px] w-[94px]" />
                      </div>
                      <div className="flex flex-col">
                        <div className="font-semibold w-[40%] h-[14px] animate-pulse rounded-full bg-slate-200 "></div>
                        <div className="font-medium  w-[25%] h-[10px] animate-pulse rounded-full bg-slate-200"></div>
                      </div>
                    </div>

                    <div className="w-[15%] h-[10px] animate-pulse rounded-full bg-slate-200  pn:max-sm:hidden"></div>
                    <div className="w-[15%] h-[10px] animate-pulse rounded-full bg-slate-200  pn:max-sm:hidden"></div>
                    <div className="w-[15%] h-[10px] animate-pulse rounded-full bg-slate-200  pn:max-sm:hidden"></div>
                    <div className="w-[20%] h-[10px] animate-pulse rounded-full bg-slate-200  pn:max-sm:hidden"></div>
                    <div className="flex justify-center w-3 animate-pulse h-[10px] bg-slate-200 rounded-full"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 items-center sm:hidden justify-between w-full">
                    <div className="w-[100%] bg-white border rounded-2xl space-y-2 p-2 text-[12px]">
                      <div className="">Topics</div>
                      <div className="w-full h-[10px] animate-pulse rounded-full bg-slate-200 text-center"></div>
                    </div>
                    <div className="w-[100%] bg-white border rounded-2xl space-y-2 p-2 text-[12px]">
                      <div className="">Post</div>
                      <div className="w-full h-[10px] animate-pulse rounded-full bg-slate-200 text-center"></div>
                    </div>
                    <div className="w-[100%] bg-white border rounded-2xl space-y-2 p-2 text-[12px]">
                      <div className="">Member</div>
                      <div className="w-full h-[10px] animate-pulse rounded-full bg-slate-200 text-center"></div>
                    </div>
                    <div className="w-[100%] bg-white border rounded-2xl space-y-2 p-2 text-[12px]">
                      <div className="">Engagement rate</div>
                      <div className="w-full h-[10px] animate-pulse rounded-full bg-slate-200 text-center"></div>
                    </div>
                  </div>
                </div>
                <div className=" items-center w-full pn:max-sm:space-y-2 border-b p-2 relative bg-[#ffffff] shadow-sm ">
                  <div className="flex items-center gap-4 justify-between w-full">
                    <div className="flex items-center w-[50%] gap-2">
                      <div className="h-[100px] w-[100px] rounded-[4px] border border-dashed flex items-center justify-center">
                        <div className=" bg-contain animate-pulse bg-slate-400 h-[94px] rounded-[4px] w-[94px]" />
                      </div>
                      <div className="flex flex-col">
                        <div className="font-semibold w-[40%] h-[14px] animate-pulse rounded-full bg-slate-200 "></div>
                        <div className="font-medium  w-[25%] h-[10px] animate-pulse rounded-full bg-slate-200"></div>
                      </div>
                    </div>

                    <div className="w-[15%] h-[10px] animate-pulse rounded-full bg-slate-200  pn:max-sm:hidden"></div>
                    <div className="w-[15%] h-[10px] animate-pulse rounded-full bg-slate-200  pn:max-sm:hidden"></div>
                    <div className="w-[15%] h-[10px] animate-pulse rounded-full bg-slate-200  pn:max-sm:hidden"></div>
                    <div className="w-[20%] h-[10px] animate-pulse rounded-full bg-slate-200  pn:max-sm:hidden"></div>
                    <div className="flex justify-center w-3 animate-pulse h-[10px] bg-slate-200 rounded-full"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 items-center sm:hidden justify-between w-full">
                    <div className="w-[100%] bg-white border rounded-2xl space-y-2 p-2 text-[12px]">
                      <div className="">Topics</div>
                      <div className="w-full h-[10px] animate-pulse rounded-full bg-slate-200 text-center"></div>
                    </div>
                    <div className="w-[100%] bg-white border rounded-2xl space-y-2 p-2 text-[12px]">
                      <div className="">Post</div>
                      <div className="w-full h-[10px] animate-pulse rounded-full bg-slate-200 text-center"></div>
                    </div>
                    <div className="w-[100%] bg-white border rounded-2xl space-y-2 p-2 text-[12px]">
                      <div className="">Member</div>
                      <div className="w-full h-[10px] animate-pulse rounded-full bg-slate-200 text-center"></div>
                    </div>
                    <div className="w-[100%] bg-white border rounded-2xl space-y-2 p-2 text-[12px]">
                      <div className="">Engagement rate</div>
                      <div className="w-full h-[10px] animate-pulse rounded-full bg-slate-200 text-center"></div>
                    </div>
                  </div>
                </div>
              </>
            ) : postData?.length > 0 ? (
              postData?.map((d, i) =>
                d?.post.length > 0 ? (
                  <div
                    key={i}
                    className=" items-center w-full pn:max-sm:space-y-2 border-b p-2 relative bg-[#ffffff] shadow-sm "
                  >
                    <div className="flex items-center  justify-between w-full">
                      <div className="flex items-center w-[50%] gap-2">
                        <div className="h-[100px] w-[100px] rounded-[4px] border border-dashed flex items-center justify-center">
                          {d?.post?.[0]?.type === "video/mp4" ? (
                            <img
                              alt="dps"
                              src={d?.post?.[d?.post?.length - 1]?.thumbnail}
                              className=" bg-contain bg-slate-400 h-[94px] rounded-[4px] w-[94px]"
                            />
                          ) : (
                            <img
                              alt="dps"
                              src={d?.post?.[0]?.content}
                              className=" bg-contain bg-slate-400 h-[94px] rounded-[4px] w-[94px]"
                            />
                          )}
                        </div>
                        <div className="flex flex-col">
                          <div className="font-semibold text-black">
                            {d?.title}
                          </div>
                          <div className="font-medium text-[14px] text-[#667085]">
                            {d?.description}
                          </div>
                        </div>
                      </div>

                      <div className="w-[20%] text-center text-[12px] pn:max-sm:hidden">
                        {d?.likes}
                      </div>
                      <div className="w-[20%] text-center text-[12px] pn:max-sm:hidden">
                        {d?.analytics[0]?.views}
                      </div>
                      <div className="w-[20%] text-center text-[12px] pn:max-sm:hidden">
                        {d?.commentcount}
                      </div>
                      <div className="w-[30%] text-center text-[12px] pn:max-sm:hidden text-green-600">
                        47.59%
                      </div>
                      <div
                        onClick={() => {
                          setSelectedPost(d._id);
                        }}
                        className="flex justify-center relative"
                      >
                        <BsThreeDotsVertical className="text-gray-500 cursor-pointer" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 items-center sm:hidden justify-between w-full">
                      <div className="w-[100%] bg-white border rounded-2xl space-y-2 p-2 text-[12px]">
                        <div className="">Topics</div>
                        <div className="w-full text-center">{d?.likes}</div>
                      </div>
                      <div className="w-[100%] bg-white border rounded-2xl space-y-2 p-2 text-[12px]">
                        <div className="">Post</div>
                        <div className="w-full text-center">
                          {d?.analytics[0]?.views}
                        </div>
                      </div>
                      <div className="w-[100%] bg-white border rounded-2xl space-y-2 p-2 text-[12px]">
                        <div className="">Member</div>
                        <div className="w-full text-center">
                          {" "}
                          {d?.commentcount}
                        </div>
                      </div>
                      <div className="w-[100%] bg-white border rounded-2xl space-y-2 p-2 text-[12px]">
                        <div className="">Engagement rate</div>
                        <div className="text-green-600 text-center w-full">
                          47.59%
                        </div>
                      </div>
                    </div>
                    {selectedPost === d._id ? (
                      <div className="absolute  w-[120px] bg-white top-[25%] right-0 border shadow-lg rounded-2xl py-2 z-10">
                        <button className="w-full px-4 py-2 text-sm hover:bg-gray-100 font-semibold">
                          Edit
                        </button>
                        <button
                          onClick={() => deletePost(d._id)} // Pass post ID here
                          className="w-full px-4 py-2 text-sm hover:bg-gray-100 font-semibold"
                        >
                          Delete
                        </button>
                      </div>
                    ) : null}
                  </div>
                ) : null
              )
            ) : (
              <div className="items-center w-full pn:max-sm:space-y-2 border-b p-2 relative bg-[#ffffff] shadow-sm text-slate-500 text-center">
                No Post Available
              </div>
            )}
          </div>
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
