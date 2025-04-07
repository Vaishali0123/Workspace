"use client";
import { API } from "@/app/utils/helpers";
import axios from "axios";
import React, { Dispatch, SetStateAction, Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { HiOutlineCloudUpload } from "react-icons/hi";
import { MdAdd } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import toast, { Toaster } from "react-hot-toast";
// import { setPost } from "@/app/redux/slices/leastparams";
// import { useDispatch } from "react-redux";
interface UploadPostProps {
  postName: string;
  postDesc: string;
  postFiles: File[];
  tags: string[];
  userId: string;
  communityId: string;
  topicId: string;
  API: string;
  setUploadProgress: Dispatch<SetStateAction<number[]>>;
  setUploadSuccess: Dispatch<SetStateAction<boolean[]>>;
  setUploadError: Dispatch<SetStateAction<string[]>>;
  setUploading: Dispatch<SetStateAction<boolean>>;
}
const PageContent = () => {
  const [files, setFiles] = useState<File[]>([]);
  const searchParams = useSearchParams();
  const communityId = searchParams.get("communityId");
  const topicId = searchParams.get("topicId");
  const userId = searchParams.get("userId");
  const router = useRouter();
  const [postName, setPostName] = useState("");
  const [postDesc, setPostDesc] = useState("");
  const [uploadProgress, setUploadProgress] = useState<number[]>([]);
  const [uploading, setUploading] = useState(false);
  console.log(uploading);
  const [load, setLoad] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState<boolean[]>([]);
  const [uploadError, setUploadError] = useState<string[]>([]);
  // const [communityId, setCommunityId] = useState("");
  // const [count, setCount] = useState(0);
  const [postFiles, setPostFiles] = useState<File[]>([]);
  const [thumbnails, setThumbnails] = useState<{ [key: number]: File | null }>(
    {}
  );
  const [thumbnail, setThumbnail] = useState<File>();
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const addTag = () => {
    if (inputValue.trim() && !tags.includes(inputValue.trim())) {
      setTags([...tags, inputValue.trim()]);
      setInputValue(""); // Clear input after adding
    }
  };

  // Function to remove a tag
  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handlePosts = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = e.target.files ? Array.from(e.target.files) : [];

    const updatedThumbnails = { ...thumbnails };
    handleFileChange(e);
    files.forEach((file, index) => {
      if (file.type.startsWith("video/")) {
        // Initialize thumbnail entry for video
        updatedThumbnails[postFiles.length + index] = null;
      }
    });

    setPostFiles((prevFiles) => [...prevFiles, ...files]);
    setThumbnails(updatedThumbnails);
  };

  const removeFile = (index: number) => {
    setPostFiles((prev) => prev.filter((_, i) => i !== index));

    setThumbnails((prev) => {
      const updated = { ...prev };
      delete updated[index];
      return updated;
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
    setFiles((prevFiles) => {
      const uniqueFiles = [
        ...prevFiles,
        ...selectedFiles.filter(
          (newFile) =>
            !prevFiles.some(
              (file) =>
                file.name === newFile.name &&
                file.lastModified === newFile.lastModified
            )
        ),
      ];
      return uniqueFiles;
    });

    setUploadProgress((prev) => [
      ...prev,
      ...Array(selectedFiles.length).fill(0),
    ]);
    setUploadSuccess((prev) => [
      ...prev,
      ...Array(selectedFiles.length).fill(false),
    ]);
    setUploadError((prev) => [
      ...prev,
      ...Array(selectedFiles.length).fill(""),
    ]);
  };

  const uploadFilesAndCreatePost = async ({
    postName,
    postDesc,
    postFiles,
    tags,
    userId,
    communityId,
    topicId,
    API,
    setUploadProgress,
    setUploadSuccess,
    setUploadError,
    setUploading,
  }: UploadPostProps) => {
    setLoad(true);
    const isVideoFirst = files.some((file) => file.type.startsWith("video/"));
    if (!postFiles.length) {
      alert("Please select at least one file.");
      setLoad(false);
      return;
    }
    if (!postName) {
      toast.error("Title is missing!");
      setLoad(false);
      return;
    }
    if (isVideoFirst && !thumbnail) {
      toast.error("Please select thumbnail!");
      setLoad(false);
      return;
    }
    setUploading(true);
    setUploadProgress(Array(postFiles.length).fill(0));
    setUploadSuccess(Array(postFiles.length).fill(false));
    setUploadError(Array(postFiles.length).fill(""));

    try {
      // Step 1: Get Pre-Signed URLs
      const presignedResponse = await axios.post(
        `${API}/generate-presigned-url`,
        {
          files: [
            ...postFiles.map((file) => ({
              name: file.name,
              type: file.type,
              size: file.size,
            })),
            ...(isVideoFirst && thumbnail
              ? [
                  {
                    name: thumbnail.name,
                    type: thumbnail.type,
                    size: thumbnail.size,
                  },
                ]
              : []),
          ],
          isVideoFirst,
        }
      );

      const { presignedUrls, postContent } = presignedResponse.data;

      // Step 2: Upload to S3 using Presigned URLs
      await Promise.all(
        postFiles.map(async (file, index) => {
          try {
            await axios.put(presignedUrls[index], file, {
              headers: {
                "Content-Type": file.type,
              },
              onUploadProgress: (progressEvent) => {
                if (progressEvent?.total) {
                  setUploadProgress((prev) => {
                    const updatedProgress = [...prev];
                    const a = progressEvent?.total ? progressEvent?.total : 1;
                    updatedProgress[index] = Math.round(
                      (progressEvent.loaded * 100) / a
                    );
                    return updatedProgress;
                  });
                }
              },
            });

            setUploadSuccess((prev) => {
              const updatedSuccess = [...prev];
              updatedSuccess[index] = true;
              return updatedSuccess;
            });
          } catch (uploadError) {
            console.log(uploadError);
            toast.error("File upload error:");
            setUploadError((prev) => {
              const updatedErrors = [...prev];
              updatedErrors[index] = `Failed to upload ${file.name}`;
              return updatedErrors;
            });
          }
        })
      );
      if (isVideoFirst && thumbnail) {
        const thumbnailUrl = presignedUrls[presignedUrls.length - 1];
        await axios.put(thumbnailUrl, thumbnail, {
          headers: { "Content-Type": thumbnail.type },
        });
      }
      // Step 3: Create the Post
      const postResponse = await axios.post(
        `${API}/createpost/${userId}/${communityId}/${topicId}`,
        {
          title: postName,
          description: postDesc,
          tags,
          postContent,
        }
      );
      if (postResponse?.data?.success) {
        toast.success("Post created successfully!");

        router.back();
      }
    } catch (error) {
      console.log(error);
      // if (error?.status === 400) {
      //   toast.error("Missing required fields");
      // } else {

      toast.error("Failed to create post!");
      // }
    } finally {
      setUploading(false);
    }
    setLoad(false);
  };

  return (
    <div className="w-full z-40 h-full flex justify-center items-center">
      <Toaster />
      <div className="flex flex-col sm:mb-0 space-y-2 items-center sm:rounded-xl w-full h-full">
        {/* header  */}
        <div className="flex  border rounded-2xl justify-between h-[60px] w-full bg-white items-center p-2">
          <div className="flex justify-center items-center gap-4">
            <div className="flex flex-col">
              <div className="text-[16px] font-semibold">Post On Grovyo</div>
              <div className="text-[14px] text-[#6F7787] font-medium">
                You can add an Image or a Video with Thumbnail
              </div>
            </div>
          </div>
          <div className="flex justify-center text-[14px] font-medium items-center gap-2">
            <div className="font-medium p-2 pn:max-pp:hidden px-5 rounded-lg">
              Discard
            </div>
            {load ? (
              <div className="bg-[#4880FF] cursor-pointer font-medium text-white p-2 px-4 pp:px-7 rounded-xl">
                Publishing...
              </div>
            ) : (
              <div
                onClick={() => {
                  if (userId && communityId && topicId && API) {
                    uploadFilesAndCreatePost({
                      postName,
                      postDesc,
                      postFiles,
                      // selectedFiles,
                      // isVideoFirst,
                      tags,
                      userId, // Replace with actual user ID
                      communityId, // Replace with actual community ID
                      topicId, // Replace with actual topic ID
                      API, // Replace with actual API URL
                      setUploadProgress,
                      setUploadSuccess,
                      setUploadError,
                      setUploading,
                    });
                  }
                }}
                className="bg-[#4880FF] cursor-pointer font-medium text-white p-2 px-4 pp:px-7 rounded-xl"
              >
                Publish
              </div>
            )}
          </div>
        </div>
        {/*post Uploader section */}
        <div className="grid sm:grid-cols-2 bg-white rounded-2xl h-[calc(98%-60px)] border w-full gap-5 p-3">
          {/* left section */}
          <div className="w-full flex flex-col gap-2">
            <div>Upload post</div>
            <div className="w-full  rounded-2xl h-full space-y-2">
              <input
                disabled={postFiles.length > 0}
                accept="image/*, video/*"
                multiple
                type="file"
                onChange={(e) => {
                  const files = e.target.files
                    ? Array.from(e.target.files)
                    : [];

                  const hasVideo = files.some((file) =>
                    file.type.startsWith("video/")
                  );

                  const hasImage = files.some((file) =>
                    file.type.startsWith("image/")
                  );
                  if (files.length > 1) {
                    toast.error("You can only upload one image or one video.");
                    e.target.value = "";
                    return;
                  }
                  // Prevent mixed uploads
                  if (hasVideo && hasImage) {
                    toast.error(
                      "You cannot mix images and videos in one upload."
                    );
                    e.target.value = ""; // Reset input
                    return;
                  }

                  // Handle video uploads (only one allowed)
                  if (hasVideo) {
                    handlePosts(e);
                    return;
                  }

                  // Handle image uploads (up to 4 allowed)
                  if (hasImage) {
                    handlePosts(e);
                  }
                }}
                id="postUpload"
                className="hidden w-full"
              />

              <label
                htmlFor="postUpload"
                className="w-full h-[220px] cursor-pointer bg-slate-600 rounded-xl"
              >
                <div className="h-[220px] w-full border border-dashed bg-white  p-2 rounded-2xl flex flex-col justify-center items-center">
                  <div className="p-5 bg-[#3e72ff] rounded-full">
                    <HiOutlineCloudUpload className="text-4xl text-[#bee3ff] font-thin" />
                  </div>
                  <div className="text-center mt-2 flex justify-center items-center flex-col">
                    <div className="font-medium">
                      <span className="text-[#379AE6]">
                        Click to choose file
                      </span>
                    </div>
                    {/* {isVideo} */}
                    <div className="text-sm text-[#6F7787]">
                      Your ideas will be private until you publish them.
                    </div>
                  </div>
                </div>
              </label>
            </div>

            {/* Preview Uploaded Files */}
            <div className="flex flex-wrap items-center gap-4 mt-4">
              {postFiles.map((file, index) => (
                <div
                  key={index}
                  className="relative w-[250px] rounded-xl border h-[150px]"
                >
                  {file.type.startsWith("image/") ? (
                    <img
                      src={URL.createObjectURL(file)}
                      alt="Preview"
                      className="rounded-xl w-full object-contain  h-full"
                    />
                  ) : (
                    <video
                      className="rounded-xl w-full h-full object-cover bg-black"
                      controls
                      poster={
                        thumbnail instanceof File
                          ? URL.createObjectURL(thumbnail)
                          : thumbnail
                      }
                    >
                      <source
                        src={URL.createObjectURL(file)}
                        type={file.type}
                      />
                    </video>
                  )}

                  {/* Remove File Button */}
                  <div
                    className="absolute cursor-pointer top-0 right-0 p-1"
                    onClick={() => removeFile(index)}
                  >
                    <RxCross2 className="text-white bg-red-500 rounded-full p-1 text-xl" />
                  </div>

                  {/* Thumbnail Input for Videos */}
                  {/* uploading video  */}
                  {/* {file.type.startsWith("video/") && (
                    <div className="mt-2">
                      <label
                        htmlFor="postUpload"
                        className="w-full h-[220px] cursor-pointer shadow-md rounded-2xl"
                      >
                        <div className="h-[220px] dark:border-[#fff] w-full border border-dashed p-2 rounded-2xl flex flex-col justify-center items-center">
                          <div className="rounded-full">
                            <PiVideoFill className="text-5xl dark:text-white text-black" />
                          </div>
                          <div className="text-center mt-2 flex justify-center items-center flex-col">
                            <div className="font-medium">Upload Thumbnail</div>
                          </div>
                        </div>
                      </label>

                   
                      <input
                        accept="image/*"
                        name="image"
                        type="file"
                        id="postUpload"
                        onChange={(e) => setThumbnail(e.target.files?.[0])}
                        className="hidden w-full"
                      />

                      {thumbnail && (
                        <img
                          src={URL.createObjectURL(thumbnail)}
                          alt="Thumbnail Preview"
                          className="rounded-lg w-full h-16 mt-2"
                        />
                      )}
                    </div>
                  )} */}
                  {postFiles.length === 1 &&
                    postFiles[0].type.startsWith("video/") && (
                      <div className="mt-4">
                        <label
                          htmlFor="thumbnailUpload"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Upload Thumbnail
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file && file.type.startsWith("image/")) {
                              setThumbnail(file);
                            } else {
                              toast.error(
                                "Please upload a valid image for thumbnail."
                              );
                              e.target.value = "";
                            }
                          }}
                          id="thumbnailUpload"
                          className="mt-1 block w-full text-sm text-gray-500"
                        />
                      </div>
                    )}
                </div>
              ))}
            </div>
            <div className="absolute flex items-center justify-center w-full ">
              <div className="bg-white border p-2 px-6 rounded-xl ">
                {/* Progress Bars */}
                {files.map(
                  (file, index) =>
                    uploadProgress[index] > 0 && (
                      <div key={index} className="mt-4">
                        <div className="flex justify-between items-center">
                          <p className="text-sm font-medium mb-1">
                            {file.name}
                          </p>
                          <div
                            className="absolute cursor-pointer top-0 right-0 p-1"
                            onClick={() => removeFile(index)}
                          >
                            <RxCross2 className="text-white bg-red-500 rounded-full p-1 text-xl" />
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-4">
                          <div
                            className={`h-4 rounded-full ${
                              uploadSuccess[index]
                                ? "bg-green-500"
                                : uploadError[index]
                                ? "bg-red-500"
                                : "bg-blue-500"
                            }`}
                            style={{
                              width: `${uploadProgress[index] || 0}%`,
                            }}
                          ></div>
                        </div>
                        <p className="text-sm mt-1">
                          {uploadError[index]
                            ? uploadError[index]
                            : `${uploadProgress[index] || 0}% uploaded`}
                        </p>
                      </div>
                    )
                )}

                {/* Success Message */}
                {uploadSuccess.every((success) => success) &&
                  files.length > 0 && (
                    <p className=" text-green-600 font-semibold">
                      All files uploaded successfully!
                    </p>
                  )}
              </div>
            </div>
          </div>
          {/* right section */}
          <div className="w-full flex flex-col gap-2">
            {/* title section */}
            <div className="flex flex-col w-full gap-1">
              <div>Title</div>
              <div>
                <input
                  type="text"
                  value={postName}
                  onChange={(e) => setPostName(e.target.value)}
                  className="p-1.5 px-3 border dark:bg-[#323d4e] outline-none rounded-xl w-full"
                  placeholder="Enter Title"
                />
              </div>
            </div>
            {/* desc section */}
            <div className="flex flex-col w-full gap-1">
              <div>Description</div>
              <div>
                <textarea
                  value={postDesc}
                  onChange={(e) => setPostDesc(e.target.value)}
                  className="outline-none p-2 border dark:bg-[#323d4e] w-[100%] no-scrollbar resize-y rounded-xl min-h-32 max-h-48 "
                  placeholder="Describe the Post in few words"
                  maxLength={500}
                />
              </div>
            </div>
            {/* hashtags section */}
            <div className="flex flex-col w-full gap-1">
              <div>Add Hashtags</div>
              <div className="w-full border dark:bg-[#323d4e] rounded-lg flex justify-center items-center">
                <input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  type="text"
                  className="p-1.5 px-3 bg-transparent outline-none rounded-xl w-full"
                  placeholder="Enter Hashtags"
                />
                <button
                  onClick={addTag}
                  className="flex justify-center items-center p-2 rounded-r-lg text-[#2461FD] dark:bg-[#3d4654] dark:text-white bg-[#F0F4FF]"
                >
                  <div>
                    <MdAdd />
                  </div>
                  <div>Add</div>
                </button>
              </div>
              <div className="flex items-center pt-2 flex-wrap gap-2">
                {tags.map((tag: string, index: number) => (
                  <div
                    key={index}
                    className="bg-[#FDF8F1] flex justify-center items-center gap-2 text-[#E7A034] p-1 rounded-full px-4"
                  >
                    <div>{tag}</div>
                    <RxCross2
                      className="cursor-pointer"
                      onClick={() => removeTag(index)}
                    />
                  </div>
                ))}
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
    <Suspense fallback={<div>Loading...</div>}>
      <PageContent />
    </Suspense>
  );
};

export default Page;
