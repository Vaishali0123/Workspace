"use client";
import React, { Suspense, useEffect, useState } from "react";
// import Image from "next/image";
import { FaInstagram, FaLinkedin, FaSnapchat } from "react-icons/fa";
import { RiYoutubeLine } from "react-icons/ri";
import { MdOutlineModeEdit } from "react-icons/md";
import { useFetchSettingsQuery } from "@/app/redux/slices/settingApi";
import { useSearchParams } from "next/navigation";

const PageContent = () => {
  const [click, setClick] = useState<number>(0);
  const searchParams = useSearchParams();

  const userId = searchParams.get("userId");
  // const [cropData, setCropData] = useState<string>(""); // Holds the cropped image data
  // const cropperRef = React.useRef<HTMLImageElement>(null);
  // const cropperRef = useRef<HTMLImageElement & { cropper?: Cropper }>(null);
  const [profilePic, setProfilePic] = useState<string>("");
  const [shouldSkip, setShouldSkip] = useState(false);
  const { data, isLoading } = useFetchSettingsQuery(userId, {
    skip: !!shouldSkip,
  });

  useEffect(() => {
    if (data) {
      setShouldSkip(true);
    }
  }, [data]);

  const [fullname, setFullname] = useState<string>("");
  const [insta, setInsta] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [snap, setSnap] = useState<string>("");
  const [x, setX] = useState<string>("");
  const [linkdin, setLinkdin] = useState<string>("");
  const [yt, setYt] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  // const [imageFile, setImageFile] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        // setImageToCrop(reader.result as string); // Load the image into the cropper
        // setShowCropper(true); // Show the cropper modal
        // setImageFile(file);

        setProfilePic(reader.result as string); // Update the state with the new image URL
      };
      reader.readAsDataURL(file);
    }
  };
  // const handleCrop = () => {
  //   // Check if cropperRef.current exists and the cropper is initialized
  //   if (cropperRef.current && cropperRef.current.cropper) {
  //     const cropper = cropperRef.current.cropper; // TypeScript knows this is a Cropper instance
  //     const croppedImage = cropper.getCroppedCanvas().toDataURL(); // Get the cropped image data
  //     setCropData(croppedImage); // Set cropped image data
  //     setProfilePic(croppedImage); // Set cropped image as the profile picture
  //     // setShowCropper(false); // Hide the cropper modal
  //   }
  // };
  // const updatesetting = async () => {
  //   setLoad(true);
  //   try {
  //     const formData = new FormData();

  //     formData.append("fullname", fullname);
  //     formData.append("insta", insta);
  //     formData.append("email", email);
  //     formData.append("snap", snap);
  //     formData.append("x", x);
  //     formData.append("linkdin", linkdin);
  //     formData.append("yt", yt);
  //     formData.append("bio", bio);
  //     formData.append("username", username);
  //     formData.append("phone", phone);
  //     if (cropData) {
  //       const blob = await fetch(cropData).then((res) => res.blob());
  //       formData.append(
  //         "profilepic",
  //         blob,
  //         imageFile?.name ? imageFile?.name : "profilepic.jpg"
  //       ); // Assuming profilepic.jpg as the filename
  //     }
  //     const res = await axios.post(`${API}/settings/${userId}`, formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });
  //     console.log(res?.data);
  //   } catch (e) {
  //     console.log(e);
  //   }
  //   setLoad(false);
  // };

  useEffect(() => {
    if (!isLoading) {
      setFullname(data?.data?.fullname);
      setEmail(data?.data?.email);
      setBio(data?.data?.bio);
      setPhone(data?.data?.phone);
      setYt(data?.data?.yt);
      setUsername(data?.data?.username);
      setLinkdin(data?.data?.linkdin);
      setInsta(data?.data?.insta);
      setSnap(data?.data?.snap);
      setX(data?.data?.x);
    }
  }, [isLoading, data]);
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
            <div className="flex items-center gap-2  ">
              <div
                onClick={() => setIsModalOpen(!isModalOpen)}
                className="h-[60px] w-[60px] rounded-[25px] border flex items-center p-[2px] justify-center border-dashed relative"
              >
                <img
                  src={profilePic || data?.data?.profilepic}
                  alt="profile"
                  className="h-full w-full bg-slate-100 rounded-[22px] object-cover"
                />
                <label
                  htmlFor="profilePicUpload"
                  className="bg-[#307fff] -bottom-2 -left-2 text-white p-1 rounded-full absolute"
                >
                  <MdOutlineModeEdit />
                </label>
                <input
                  id="profilePicUpload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </div>
            </div>
            <div className="bg-white border rounded-xl  text-[14px] p-2 w-full">
              <div className="text-[#6a6a6a]">Full Name</div>
              <input
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                className="px-2 outline-none w-full"
                placeholder="Enter you fullname"
              />
            </div>
            {/* <div className="text-[#307fff]">Edit</div> */}
          </div>
          <div className="flex px-2 gap-2 items-center">
            <div className="bg-white border rounded-xl text-[14px] p-2 w-full">
              <div className="text-[#6a6a6a]">Username</div>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="px-2 outline-none w-full"
                placeholder="Enter your Username"
              />
            </div>
            {/* <div className="text-[#307fff]">Edit</div> */}
          </div>
          <div className="flex px-2 gap-2 items-center ">
            <div className="bg-white border rounded-xl text-[14px] p-2 w-full">
              <div className="text-[#6a6a6a]">Email Address</div>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={
                  email?.length > 0 && email != "undefined" && email
                    ? email
                    : ""
                }
                className="px-2 outline-none w-full"
                placeholder="Enter your Email"
              />
            </div>
            {/* <div className="text-[#307fff]">Edit</div> */}
          </div>
          <div className="flex px-2 gap-2 items-center">
            <div className="bg-white border rounded-xl text-[14px] p-2 w-full">
              <div className="text-[#6a6a6a] text-[14px]">Phone no</div>
              <div className="flex">
                {/* <div className="text-[#999999]">+91</div> */}
                <input
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone?.length > 0 && phone ? phone : ""}
                  className="px-2 outline-none w-full"
                  placeholder="XXXXXXXXXXX"
                  type="number"
                />
              </div>
            </div>
            {/* <div className="text-[#307fff]">Edit</div> */}
          </div>
          <div className="flex px-2 gap-2 items-center">
            <div className="bg-white border rounded-xl text-[14px] p-2 w-full">
              <div className="text-[#6a6a6a]">Bio</div>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="px-2 w-full outline-none"
                placeholder="Add a creative bio to attract others"
              />
            </div>
            {/* <div className="text-[#307fff]">Edit</div> */}
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
                value={snap}
                onChange={(e) => setSnap(e.target.value)}
                className="px-2 outline-none w-full"
                placeholder="Paste your Snapchat link"
              />
            </div>
            {/* <div className="text-[#307fff]">Edit</div> */}
          </div>{" "}
          <div className="flex px-2 gap-2 items-center">
            <RiYoutubeLine className="h-6 w-6 text-[#ff3f3f]" />
            <div className="bg-white border rounded-xl text-[14px] p-2 w-full">
              <div className="text-[#6a6a6a]">Youtube</div>
              <input
                value={yt}
                onChange={(e) => setYt(e.target.value)}
                className="px-2 outline-none w-full"
                placeholder="Paste your Youtube channel link"
              />
            </div>
            {/* <div className="text-[#307fff]">Edit</div> */}
          </div>{" "}
          <div className="flex px-2 gap-2 items-center">
            <FaLinkedin className="h-6 w-6 text-[#3f6cff]" />
            <div className="bg-white border rounded-xl text-[14px] p-2 w-full">
              <div className="text-[#6a6a6a]">LinkedIn</div>
              <input
                value={linkdin}
                className="px-2 outline-none w-full"
                placeholder="Paste your LinkedIn link"
              />
            </div>
            {/* <div className="text-[#307fff]">Edit</div> */}
          </div>
          <div className="flex px-2 gap-2 items-center">
            <div className="h-6 w-6">X</div>
            <div className="bg-white border rounded-xl text-[14px] p-2 w-full">
              <div className="text-[#6a6a6a] ">X</div>
              <input
                value={x}
                onChange={(e) => setX(e.target.value)}
                className="px-2 outline-none w-full"
                placeholder="Paste your X link"
              />
            </div>
            {/* <div className="text-[#307fff]">Edit</div> */}
          </div>
          <div className="flex px-2 gap-2 items-center">
            <FaInstagram className="h-6 w-6 text-[#ff3fec]" />
            <div className="bg-white border rounded-xl text-[14px] p-2 w-full">
              <div className="text-[#6a6a6a]">Instagram</div>
              <input
                value={insta}
                onChange={(e) => setInsta(e.target.value)}
                className="px-2 outline-none w-full"
                placeholder="Paste your Instagram link"
              />
            </div>
            {/* <div className="text-[#307fff]">Edit</div> */}
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
const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageContent />
    </Suspense>
  );
};
export default Page;
