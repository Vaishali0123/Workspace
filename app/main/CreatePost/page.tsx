"use client";
import { API } from "@/app/utils/helpers";
import axios from "axios";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { HiOutlineCloudUpload } from "react-icons/hi";
import { MdAdd } from "react-icons/md";
import { PiVideoFill } from "react-icons/pi";
import { RxCross2 } from "react-icons/rx";
import { useAuthContext } from "@/app/Auth/Components/auth";

const Page = () => {
  const [files, setFiles] = useState<File[]>([]);
  const searchParams = useSearchParams();
  const { data } = useAuthContext();
  const communityId = searchParams.get("communityId");
  const topicId = searchParams.get("topicId");
  const [postName, setPostName] = useState("");
  const [postDesc, setPostDesc] = useState("");
  const [uploadProgress, setUploadProgress] = useState<number[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState<boolean[]>([]);
  const [uploadError, setUploadError] = useState<string[]>([]);
  // const [communityId, setCommunityId] = useState("");
  const [error, setError] = useState("");
  const [activePopupId, setActivePopupId] = useState<string | null>(null); // State to track the active community popup
  const [postFiles, setPostFiles] = useState<File[]>([]);
  const [thumbnails, setThumbnails] = useState<{ [key: number]: File | null }>(
    {}
  );
  const [selectedFiles, setSelectFiles] = useState(files);
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  interface IPostFile extends File {
    type: string;
    size: number;
  }

  // Function to add a tag
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

  // const createPost = async (
  //   postName: string,
  //   postDesc: string,
  //   selectedFiles: IPostFile[],
  //   isVideoFirst: boolean,
  //   tags: string[],
  //   userId: string,
  //   communityId: string,
  //   topicId: string,
  //   API: string
  // ): Promise<void> => {
  //   try {
  //     const formData = new FormData();
  //     formData.append("title", postName);
  //     formData.append("description", postDesc);
  //     formData.append("isVideoFirst", JSON.stringify(isVideoFirst));
  //     if (tags && Array.isArray(tags)) {
  //       tags.forEach((tag: string) => formData.append("tags[]", tag));
  //     }
  //     selectedFiles.forEach((file) => {
  //       formData.append("files", file);
  //     });

  //     const res = await axios.post(
  //       `${API}/CreatePost/${userId}/${communityId}/${topicId}`,
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );

  //     console.log("Post created successfully:", res.data);
  //   } catch (error) {
  //     console.error("Error creating post:", error);
  //   }
  // };
  // Upload files
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
  const handleThumbnail = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.target.files?.[0]) {
      setThumbnails((prev) => ({ ...prev, [index]: e.target.files![0] }));
    }
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

  // Upload files
  // const uploadFiles = async () => {
  //   if (!files.length) {
  //     alert("Please select at least one file.");
  //     return;
  //   }

  //   setUploading(true);
  //   setUploadSuccess(Array(files.length).fill(false));
  //   setUploadError(Array(files.length).fill(""));

  //   try {
  //     // Step 1: Get Pre-Signed URLs
  //     const { data } = await axios.post(`${API}/CreatePost`, {
  //       files: files.map((file) => ({
  //         name: file.name,
  //         type: file.type,
  //         size: file.size,
  //       })),
  //       isVideoFirst: true,
  //     });

  //     const urls: string[] = data.data;
  //     const postContent: string[] = data.postContent;

  //     console.log(postContent, "postContent");

  //     // Step 2: Upload Each File to S3
  //     await Promise.all(
  //       files.map(async (file, index) => {
  //         try {
  //           const url = urls[index];
  //           await axios.put(url, file, {
  //             headers: {
  //               "Content-Type": file.type,
  //             },
  //             onUploadProgress: (progressEvent: any) => {
  //               if (progressEvent.total) {
  //                 setUploadProgress((prev) => {
  //                   const updatedProgress = [...prev];
  //                   updatedProgress[index] = Math.round(
  //                     (progressEvent.loaded * 100) / progressEvent.total
  //                   );
  //                   return updatedProgress;
  //                 });
  //               }
  //             },
  //           });
  //           setUploadSuccess((prev) => {
  //             const updatedSuccess = [...prev];
  //             updatedSuccess[index] = true;
  //             return updatedSuccess;
  //           });
  //         } catch (err) {
  //           console.error(`Upload failed for ${file.name}:`, err);
  //           setUploadError((prev) => {
  //             const updatedErrors = [...prev];
  //             updatedErrors[index] = `Failed to upload ${file.name}`;
  //             return updatedErrors;
  //           });
  //         }
  //       })
  //     );

  //     console.log("starting api call");
  //     const res = await axios.post(
  //       `${API}/CreatePost/65926d7709fb86617923eed7/66922ac87a69195525182cb1`,
  //       {
  //         title: "Title",
  //         description: "Description",
  //         topicId: "66922ac87a69195525182cb3",
  //         postContent: postContent,
  //       }
  //     );

  //     console.log(res.data);
  //   } catch (error) {
  //     console.error("Error while generating presigned URLs:", error);
  //     alert(
  //       "Failed to generate presigned URLs. Check the console for details."
  //     );
  //   } finally {
  //     setUploading(false);
  //   }
  // };
  const uploadFilesAndCreatePost = async (
    postName: string,
    postDesc: string,
    selectedFiles: File[],
    isVideoFirst: boolean,
    tags: string[],
    userId: string,
    communityId: string,
    topicId: string,
    API: string,
    setUploadProgress: (progress: number[]) => void,
    setUploadSuccess: (success: boolean[]) => void,
    setUploadError: (errors: string[]) => void,
    setUploading: (uploading: boolean) => void
  ): Promise<void> => {
    if (!selectedFiles.length) {
      alert("Please select at least one file.");
      return;
    }

    setUploading(true);
    setUploadSuccess(Array(selectedFiles.length).fill(false));
    setUploadError(Array(selectedFiles.length).fill(""));

    try {
      // Step 1: Request Pre-Signed URLs
      const { data } = await axios.post(`${API}/CreatePost`, {
        files: selectedFiles.map((file) => ({
          name: file.name,
          type: file.type,
          size: file.size,
        })),
        isVideoFirst,
      });

      const presignedUrls: string[] = data.presignedUrls;
      const postContent: any[] = data.data;

      // Step 2: Upload Files to S3
      await Promise.all(
        selectedFiles.map(async (file, index) => {
          try {
            await axios.put(presignedUrls[index], file, {
              headers: {
                "Content-Type": file.type,
              },
              onUploadProgress: (progressEvent) => {
                if (progressEvent.total) {
                  setUploadProgress((prev: any) => {
                    const updatedProgress = [...prev];
                    updatedProgress[index] = Math.round(
                      (progressEvent.loaded * 100) / progressEvent.total
                    );
                    return updatedProgress;
                  });
                }
              },
            });

            setUploadSuccess((prev: any) => {
              const updatedSuccess = [...prev];
              updatedSuccess[index] = true;
              return updatedSuccess;
            });
          } catch (err) {
            console.error(`Upload failed for ${file.name}:`, err);
            setUploadError((prev: any) => {
              const updatedErrors = [...prev];
              updatedErrors[index] = `Failed to upload ${file.name}`;
              return updatedErrors;
            });
          }
        })
      );

      // Step 3: Create Post in Database
      const formData = new FormData();
      formData.append("title", postName);
      formData.append("description", postDesc);
      formData.append("isVideoFirst", JSON.stringify(isVideoFirst));
      tags.forEach((tag) => formData.append("tags[]", tag));
      formData.append("postContent", JSON.stringify(postContent));

      const res = await axios.post(
        `${API}/CreatePost/${userId}/${communityId}/${topicId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Post created successfully:", res.data);
    } catch (error) {
      console.error("Error during post creation:", error);
      alert("Failed to create post. Check console for details.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full z-40 h-full flex justify-center items-center">
      <div className="flex flex-col sm:mb-0 space-y-2 items-center sm:rounded-xl w-full h-full">
        {/* header  */}
        <div className="flex  border rounded-2xl justify-between h-[60px] w-full bg-white items-center p-2">
          <div className="flex justify-center items-center gap-4">
            <div className="flex flex-col">
              <div className="text-[16px] font-semibold">Post On Grovyo</div>
              <div className="text-[14px] text-[#6F7787] font-medium">
                You can add up to 4 images or videos.
              </div>
            </div>
          </div>
          <div className="flex justify-center text-[14px] font-medium items-center gap-2">
            <div className="font-medium p-2 pn:max-pp:hidden px-5 rounded-lg">
              Discard
            </div>
            <div
              onClick={() =>
                uploadFilesAndCreatePost(
                  postName,
                  postDesc,
                  selectedFiles,
                  isVideoFirst,
                  tags,
                  userId, // Replace with actual user ID
                  communityId, // Replace with actual community ID
                  topicId, // Replace with actual topic ID
                  API, // Replace with actual API URL
                  setUploadProgress,
                  setUploadSuccess,
                  setUploadError,
                  setUploading
                )
              }
              className="bg-[#4880FF] cursor-pointer font-medium text-white p-2 px-4 pp:px-7 rounded-xl"
            >
              Publish
            </div>
          </div>
        </div>
        {/*post Uploader section */}
        <div className="grid sm:grid-cols-2 bg-white rounded-2xl h-[calc(98%-60px)] border w-full gap-5 p-3">
          {/* left section */}
          <div className="w-full flex flex-col gap-2">
            <div>Upload post</div>
            <div className="w-full space-y-2">
              <label
                htmlFor="postUpload"
                className="w-full h-[220px] cursor-pointer shadow-md rounded-lg"
              >
                <div className="h-[220px] dark:border-[#fff] w-full border border-dashed p-2 rounded-lg flex flex-col justify-center items-center">
                  <div className="p-5 bg-[#F0F4FF] rounded-full">
                    <HiOutlineCloudUpload className="text-4xl text-[#379AE6] font-thin" />
                  </div>
                  <div className="text-center mt-2 flex justify-center items-center flex-col">
                    <div className="font-medium">
                      <span className="text-[#379AE6]">
                        Click to choose file
                      </span>
                    </div>
                    <div className="text-sm text-[#6F7787]">
                      Your ideas will be private until you publish them.
                    </div>
                  </div>
                </div>
              </label>
              <input
                accept="image/*, video/*"
                multiple
                type="file"
                onChange={(e) => {
                  const files = e.target.files
                    ? Array.from(e.target.files)
                    : [];
                  const isVideo = files.some((file) =>
                    file.type.startsWith("video/")
                  );
                  const isImage = files.every((file) =>
                    file.type.startsWith("image/")
                  );

                  if (isVideo && files.length > 1) {
                    alert("You can only upload one video.");
                    e.target.value = ""; // Reset input
                    return;
                  }

                  if (isImage && files.length > 4) {
                    alert("You can upload up to 4 images.");
                    e.target.value = ""; // Reset input
                    return;
                  }

                  if (isVideo && !isImage) {
                    handlePosts(e); // Allow only one video
                  } else if (isImage && !isVideo) {
                    handlePosts(e); // Allow up to 4 images
                  } else {
                    alert("You cannot mix images and videos in one upload.");
                    e.target.value = ""; // Reset input
                  }
                }}
                id="postUpload"
                className="hidden w-full"
              />
            </div>

            {/* Preview Uploaded Files */}
            <div className="flex flex-wrap items-center gap-4 mt-4">
              {postFiles.map((file, index) => (
                <div key={index} className="relative w-[100px] h-[100px]">
                  {file.type.startsWith("image/") ? (
                    <img
                      src={URL.createObjectURL(file)}
                      alt="Preview"
                      className="rounded-lg w-full object-cover bg-black h-full"
                    />
                  ) : (
                    <video
                      className="rounded-lg w-full h-full object-cover bg-black"
                      controls
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
                  {file.type.startsWith("video/") && (
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
                            <div className="font-medium">Upload Video</div>
                          </div>
                        </div>
                      </label>

                      {/* showing thumbnail */}
                      <input
                        accept="video/*"
                        name="image"
                        type="file"
                        id="postUpload"
                        onChange={(e) => handleThumbnail(e, index)}
                        className="hidden w-full"
                      />

                      {thumbnails[index] && (
                        <img
                          src={URL.createObjectURL(thumbnails[index]!)}
                          alt="Thumbnail Preview"
                          className="rounded-lg w-full h-16 mt-2"
                        />
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="absolute bg-white border p-2 px-6 rounded-xl bottom-0 right-0">
              {/* Progress Bars */}
              {files.map((file, index) => (
                <div key={index} className="mt-4">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium mb-1">{file.name}</p>
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
              ))}

              {/* Success Message */}
              {uploadSuccess.every((success) => success) &&
                files.length > 0 && (
                  <p className=" text-green-600 font-semibold">
                    All files uploaded successfully!
                  </p>
                )}
            </div>
          </div>
          {/* right section */}
          <div className="w-full flex flex-col gap-2">
            <div className="flex flex-col w-full gap-1">
              <div>Title</div>
              <div>
                <input
                  type="text"
                  value={postName}
                  onChange={(e) => setPostName(e.target.value)}
                  // value={post?.title}
                  // onChange={(e) =>
                  //   dispatch(setPost({ ...post, title: e.target.value }))
                  // }
                  className="p-1.5 px-3 border dark:bg-[#323d4e] outline-none rounded-lg w-full"
                  placeholder="Enter Title"
                />
              </div>
            </div>
            <div className="flex flex-col w-full gap-1">
              <div>Description</div>
              <div>
                <textarea
                  value={postDesc}
                  onChange={(e) => setPostDesc(e.target.value)}
                  className="outline-none p-2 border dark:bg-[#323d4e] w-[100%] no-scrollbar resize-y rounded-lg min-h-32 max-h-48 "
                  placeholder="Describe the Post in few words"
                  maxLength={500}
                />
              </div>
            </div>
            <div className="flex flex-col w-full gap-1">
              <div>Add Hashtags</div>
              <div className="w-full border dark:bg-[#323d4e] rounded-lg flex justify-center items-center">
                <input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  type="text"
                  className="p-1.5 px-3 bg-transparent outline-none rounded-lg w-full"
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

export default Page;
