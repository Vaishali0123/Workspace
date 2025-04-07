import React, { useState } from "react";
import { IoMdLogOut } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { IoStorefrontOutline } from "react-icons/io5";
import { MdOutlineAnalytics } from "react-icons/md";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { CgWebsite } from "react-icons/cg";
import { FiUsers } from "react-icons/fi";
import Logo from "../../assets/Logo";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useAuthContext } from "@/app/Auth/Components/auth";

const Navbar = ({ path }: { path: string }) => {
  const [pop, setPop] = useState<boolean>(false);
  const router = useRouter();
  const { data } = useAuthContext();
  const userId = data?.id;
  // const [click, setClick] = useState(0);
  const openPopup = (): void => setPop(true);
  const closePopup = (): void => setPop(false);
  // const [userData, setUserData] = useState(null);
  // const fetchUserData = async () => {
  //   try {
  //     const response = await axios.get(`${API}/getuser/${userId}`);
  //     setUserData(data);
  //   } catch (error) {
  //     console.error("Error fetching user data:", error);
  //   }
  // };
  // useEffect(() => {});
  const handleRedirect = () => {
    const query = new URLSearchParams({
      user: data?.username || "guest",
      id: data?.id || "",
    }).toString();
    console.log("loading");
    // router.push(`http://localhost:3001/main?${query}`);
    window.open(`https://prosite.grovyo.com/main?${query}`, "_blank");
  };
  const logout = async (): Promise<void> => {
    toast.success("Log Out Successfully!");
    Cookies.remove("token");
    router.push("/Auth");
  };

  return (
    <>
      {pop && (
        <div className="fixed inset-0  w-screen h-screen bg-[#1d1d1d31] flex justify-center items-center ">
          <div className="md:w-1/3 rounded-lg shadow-lg  bg-white my-3">
            <div className="flex justify-between border-b  px-5 py-4">
              <div>
                <span className="font-bold text-gray-700 text-lg">
                  Sign Out
                </span>
              </div>
              <div>
                <button>
                  <i className="fa fa-times-circle text-red-500 hover:text-red-600 transition duration-150"></i>
                </button>
              </div>
            </div>

            <div className="px-5 pt-4 text-gray-600">
              Are you sure you want to log out?
            </div>

            <div className="px-5 py-4 gap-3 flex justify-end">
              <button
                onClick={closePopup}
                className="text-sm py-2 px-3 border bg-white rounded-xl text-black transition duration-150"
              >
                Cancel
              </button>
              <button
                onClick={logout}
                className="text-sm py-2 px-3 hover:bg-red-600 border-[1px] border-red-600 rounded-xl text-red-600 hover:text-white transition duration-150"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="h-full pn:max-md:px-2 bg-white pn:max-sm:border-t pn:max-sm:fixed border-dotted pn:max-sm:bottom-0 pn:max-sm:w-full pn:max-sm:h-[60px] sm:border-r-[1px] pn:max-sm:p-2 md:p-4 flex sm:flex-col justify-between text-[#2b2b2b]">
        <div className="h-[50%] pn:max-sm:h-full pn:max-sm:rounded-2xl pn:max-sm:p-2 pn:max-sm:w-full flex sm:flex-col pn:max-sm:items-center justify-between">
          <div className="flex pn:max-sm:hidden pn:max-md:items-center pn:max-md:p-2 pn:max-md:w-full  pn:max-md:justify-center md:pl-4 gap-2">
            <div className="h-9 w-9">
              <Logo />
            </div>
            <div className="pn:max-md:hidden">
              <div className="text-[22px] font-semibold flex">
                <p className="text-[#38f]">Work</p>space
              </div>
              <div className="text-[12px] ml-16 font-semibold">by Grovyo</div>
            </div>
          </div>
          <div className="sm:space-y-1 pn:max-sm:flex sm:max-md:pt-8 pn:max-sm:gap-2 pn:max-sm:items-center pn:max-sm:w-full pn:max-sm:justify-between ">
            <Link
              href={{
                pathname: "/main/Overview",
                // query: {
                //   userId: userId,
                //   comdata: encodeURIComponent(JSON.stringify(comdata)),
                // },
              }}
              className={`sm:w-full rounded-2xl duration-100 pn:max-md:flex-col hover:bg-slate-50 sm:py-2 pn:max-sm:h-[40px] pn:max-sm:w-[40px] md:pl-4 items-center pn:max-sm:text-[10px] pn:max-sm:flex-col flex gap-1 sm:gap-2 ${
                path === "/main/Overview"
                  ? "sm:bg-[#3388ff12] sm:border sm:border-[#3388ff] text-[#3388ff]"
                  : "border border-white"
              }`}
            >
              <MdOutlineAnalytics className="text-xl" />
              <div className="pn:max-md:text-[12px] pn:max-md:font-semibold">
                Overview
              </div>
            </Link>
            <Link
              href={{
                pathname: "/main/Community",
                query: {
                  userId: userId,
                  // comdata: encodeURIComponent(JSON.stringify(comdata)),
                },
              }}
              className={`sm:w-full rounded-2xl duration-100 pn:max-md:flex-col hover:bg-slate-50 sm:py-2 pn:max-sm:h-[40px] pn:max-sm:w-[40px] md:pl-4 items-center pn:max-sm:text-[10px] pn:max-sm:flex-col flex gap-1 sm:gap-2 ${
                path === "/main/Community"
                  ? "sm:bg-[#3388ff12] sm:border sm:border-[#3388ff] text-[#3388ff]"
                  : "border border-white"
              }`}
            >
              <FiUsers className="text-xl" />
              <div className="pn:max-md:text-[12px] pn:max-md:font-semibold">
                Communities
              </div>
            </Link>
            <Link
              href={"/main/Store"}
              className={`sm:w-full rounded-2xl duration-100 pn:max-md:flex-col hover:bg-slate-50 sm:py-2 pn:max-sm:h-[40px] pn:max-sm:w-[40px] md:pl-4 items-center pn:max-sm:text-[10px] pn:max-sm:flex-col flex gap-1 sm:gap-2 ${
                path === "/main/Store"
                  ? "sm:bg-[#3388ff12] sm:border sm:border-[#3388ff] text-[#3388ff]"
                  : "border border-white"
              }`}
            >
              <IoStorefrontOutline className="text-xl" />
              <div className="pn:max-md:text-[12px] pn:max-md:font-semibold">
                Store
              </div>
            </Link>
            {/* <Link
              href={"/main/Prosite"}
              className={`sm:w-full rounded-2xl duration-100 pn:max-md:flex-col hover:bg-slate-50 sm:py-2 pn:max-sm:h-[40px] pn:max-sm:w-[40px] md:pl-4 items-center pn:max-sm:text-[10px] pn:max-sm:flex-col flex gap-1 sm:gap-2 ${
                path === "/main/Prosite"
                  ? "sm:bg-[#3388ff12] sm:border sm:border-[#3388ff] text-[#3388ff]"
                  : "border border-white"
              }`}
            >
              <MdOutlineDashboardCustomize className="text-xl" />
              <div className="pn:max-md:text-[12px] pn:max-md:font-semibold">
                Prosite
              </div>
            </Link> */}
            <Link
              href={{
                pathname: "/main/Earnwithus",
                query: {
                  userId: userId,
                },
              }}
              className={`sm:w-full rounded-2xl duration-100 pn:max-md:flex-col hover:bg-slate-50 sm:py-2 pn:max-sm:h-[40px] pn:max-sm:w-[40px] md:pl-4 items-center pn:max-sm:text-[10px] pn:max-sm:flex-col flex gap-1 sm:gap-2 ${
                path === "/main/Earnwithus"
                  ? "sm:bg-[#3388ff12] sm:border sm:border-[#3388ff] text-[#3388ff]"
                  : "border border-white"
              }`}
            >
              <RiMoneyRupeeCircleLine className="text-xl  " />
              <div className="pn:max-md:text-[12px] pn:max-md:hidden pn:max-md:font-semibold">
                Earn with Grovyo
              </div>
              <div className="pn:max-md:text-[12px] md:hidden pn:max-md:font-semibold">
                Earnings
              </div>
            </Link>
            <button
              onClick={handleRedirect}
              // href={{
              //   pathname: "/main/Earnwithus",
              //   query: {
              //     userId: userId,
              //   },
              // }}
              className={`sm:w-full rounded-2xl duration-100 pn:max-md:flex-col hover:bg-slate-50 sm:py-2 pn:max-sm:h-[40px] pn:max-sm:w-[40px] md:pl-4 items-center pn:max-sm:text-[10px] pn:max-sm:flex-col flex gap-1 sm:gap-2 
                "border border-white"
              `}
            >
              <CgWebsite className="text-xl  " />
              <div className="pn:max-md:text-[12px] pn:max-md:hidden pn:max-md:font-semibold">
                Prosite
              </div>
              <div className="pn:max-md:text-[12px] md:hidden pn:max-md:font-semibold">
                Prosite
              </div>
            </button>

            <Link
              href={{
                pathname: "/main/SetUp",
                query: {
                  userId: userId,
                },
              }}
              className={`sm:w-full rounded-2xl pn:max-md:hidden duration-100 pn:max-md:flex-col hover:bg-slate-50 sm:py-2 pn:max-sm:h-[40px] pn:max-sm:w-[40px] md:pl-4 items-center pn:max-sm:text-[10px] pn:max-sm:flex-col flex gap-1 sm:gap-2 ${
                path === "/main/SetUp"
                  ? "sm:bg-[#3388ff12] sm:border sm:border-[#3388ff] text-[#3388ff]"
                  : "border border-white"
              }`}
            >
              <IoSettingsOutline className="text-xl" />
              <div className="pn:max-sm:hidden pn:max-md:text-[12px] pn:max-md:font-semibold">
                Set Up
              </div>
            </Link>
          </div>
        </div>
        <div
          onClick={openPopup}
          className="w-full rounded-2xl pn:max-md:flex-col pn:max-sm:hidden duration-100 hover:bg-red-600 hover:text-white py-2 md:pl-4 text-red-600 items-center flex gap-2"
        >
          <IoMdLogOut className="text-xl" />
          <div className="pn:max-md:text-[12px] pn:max-md:font-semibold">
            Log Out
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
