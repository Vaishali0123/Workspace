"use client";
import React, { useCallback, useState } from "react";
import { PiClipboardText } from "react-icons/pi";
import { BsPeople } from "react-icons/bs";
import { useDispatch } from "react-redux";
import axios from "axios";
import { API, errorHandler } from "@/app/utils/helpers";
import { useEffect } from "react";
import Link from "next/link";
import {
  IoInformationCircleOutline,
  IoStorefrontOutline,
} from "react-icons/io5";
import { RiLoader2Line } from "react-icons/ri";
import { FaAsterisk, FaPlus } from "react-icons/fa6";
import toast from "react-hot-toast";
import { setIfCode } from "@/app/redux/slices/userSlice";
import { LuCircleCheckBig, LuCirclePlus } from "react-icons/lu";
import { useFetchEarnWithUsQuery } from "@/app/redux/slices/earnwithusApi";
import { useAuthContext } from "@/app/Auth/Components/auth";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import Load from "../Components/Load";
// import { FiShoppingBag } from "react-icons/fi";
// import { MdPendingActions } from "react-icons/md";
import { platformFees } from "../Components//Platformfee";
// Built-in TypeScript type
type LocationType = GeolocationCoordinates;

type BankingDetailsType = {
  IFSC: string;
  accholdername: string;
  AccountNo: string;
};
interface Products {
  name: string;
  orderscount: number;
  quantity: number;
  price: number;
  images: images[];
}
interface images {
  content: string;
}
interface Collection {
  collectionName: string;
  _id: string;
  products: Products[];
}

const PageContent = () => {
  const [collectionres, setCollectionres] = useState(false);
  const [pop, setPop] = useState(false);
  const [loading, setLoading] = useState(false);
  const [houseNo, setHouseNo] = useState("");
  const [pincode, setPincode] = useState("");
  const [landmark, setLandmark] = useState("");
  const [gst, setGst] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [docs, setDocs] = useState("");
  const [docimage, setDocimage] = useState<File | null>(null);
  const [store, setStore] = useState({ d2: "", d3: "", d4: "" });
  const [collectionName, setCollectionName] = useState("");
  const [select, setSelect] = useState(false);
  const [category, setCategory] = useState("");
  const { ifCode } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [collpopup, setCollpopup] = useState(false);
  const [collectionData, setCollectionData] = useState([]);
  const { data: authdata } = useAuthContext();
  const userId = authdata?.id;
  const [showFeeInfo, setShowFeeInfo] = useState(false);
  const [highlight, setHighlight] = useState(false);
  const [location, setLocation] = useState<LocationType>();
  const [bankingdetails, setBankingDetails] = useState<BankingDetailsType>({
    IFSC: "",
    accholdername: "",
    AccountNo: "",
  });
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleRegisterClick = () => {
    if (!onecom || post === 0) {
      setHighlight(true);
      setTimeout(() => setHighlight(false), 1500); // Remove highlight after animation
    } else {
      setPop(true);
    }
  };

  const isStoreVerified = authdata?.isStoreVerified;
  const storeid = authdata?.storeid;
  const [shouldSkip, setShouldSkip] = useState(false);
  const { data, isLoading } = useFetchEarnWithUsQuery(userId, {
    skip: !!shouldSkip,
  });
  const [load, setLoad] = useState(false);
  const { onecom, post } = useSelector((state: RootState) => state.paramslice);
  useEffect(() => {
    if (data) {
      setShouldSkip(true);
    }
  }, [data]);
  const Collection = [
    { category: "Retail" },
    { category: "Fashion and Apparel" },
    { category: "Electronics" },
    { category: "Home And Furniture" },
    { category: "Beauty and Personal Care" },
    { category: "Health and Wellness" },
    { category: "Food and Grocery" },
    { category: "Books and Media" },
    { category: "Toys and Games" },
    { category: "Jewellery and Accessories" },
    { category: "Art and Crafts" },
    { category: "Sports and Outdoors" },
    { category: "Electronics Accessories" },
    { category: "Handmade and Artisanal Products" },
    { category: "Other" },
  ];

  // postal code
  const handlePin = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const i = e.target.value;
      setStore((prev) => ({ ...prev, d4: i }));

      if (i.length === 6) {
        const res = await axios.get(
          `https://api.postalpincode.in/pincode/${i}`
        );

        if (res?.status === 200 && res.data[0]?.PostOffice) {
          const postOffice = res.data[0].PostOffice[0];
          setStore({
            d2: postOffice.District,
            d3: postOffice.State,
            d4: postOffice.Pincode,
          });
          setPincode(postOffice.Pincode);
          setCity(postOffice.District);
          setState(postOffice.State);
        }
      }
    } catch (e) {
      console.error("Error fetching postal details", e);
    }
  };

  useEffect(() => {
    if (isStoreVerified || isStoreVerified === "pending" || !ifCode) {
      return;
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(position?.coords);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
    }
  }, [isStoreVerified, ifCode]);
  // Register store
  const registerstore = async () => {
    if (!agreeTerms) {
      alert("Please agree to the location Terms & Conditions to continue.");
      return;
    }
    if (!location) {
      toast.error("Please enable location manually and refresh the page.");
      return;
    }
    try {
      setLoading(true);
      if (
        !docs ||
        !docimage ||
        !state ||
        !city ||
        !houseNo ||
        !data ||
        !bankingdetails?.IFSC ||
        !bankingdetails?.accholdername ||
        !bankingdetails?.AccountNo
      ) {
        toast.error("Please Enter Required Details");
        return;
      }

      const formData = new FormData();
      formData.append("houseNo", houseNo);
      formData.append("pincode", pincode);
      formData.append("landmark", landmark);
      formData.append("gst", gst);
      formData.append("state", state);
      formData.append("city", city);
      formData.append("docs", docs);
      formData.append("storepic", docimage || "");
      formData.append("location", JSON.stringify(location));
      formData.append("bankingdetails", JSON.stringify(bankingdetails));

      const response = await axios.post(
        `${API}/registerstore/${userId}`,
        formData
      );
      if (response.status === 200) {
        setPop(false);
        dispatch(setIfCode(false));

        toast.success("Successfully registered store");
      }
    } catch (error) {
      toast.error("Failed to register store");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // create collection

  const createCollection = async () => {
    setCollectionres(true);
    try {
      const formData = new FormData();
      formData.append("collectionName", collectionName);
      formData.append("category", category);

      const response = await axios.post(
        `${API}/createcollection/${userId}/${storeid}`,
        {
          collectionName: collectionName,
          category: category,
        }
      );

      if (response.data.success) {
        toast.success("Successfully created collection");
        setCollpopup(false);
        setCollectionData(response.data.collection);
      }
    } catch (error) {
      errorHandler(error);
    }
    setCollectionres(false);
  };
  // Get collection
  const getCollection = useCallback(async () => {
    setLoad(true);
    try {
      const response = await axios.get(`${API}/getCollection/${userId}`);

      if (response.data.success) {
        setCollectionData(response?.data?.data?.collections?.collectionId);
      }
    } catch (error) {
      console.error(error);
    }
    setLoad(false);
  }, [userId]);
  useEffect(() => {
    if (userId && isStoreVerified && collectionData?.length === 0) {
      getCollection();
    }
  }, [userId]);

  return (
    <>
      {isLoading || load ? (
        <Load />
      ) : !isStoreVerified || isStoreVerified === "pending" ? (
        <div className="w-full h-full rounded-2xl overflow-hidden relative">
          {/* register store  */}
          {ifCode || isStoreVerified != "pending" ? (
            <>
              <div className=" w-full  rounded-2xl space-y-2 flex items-center flex-col justify-center h-[100%] p-2">
                <div className="">
                  <div className="rounded-xl items-center p-4 flex gap-2 ">
                    <IoStorefrontOutline className="text-[25px]" />

                    <div className="text-[25px] font-semibold">
                      Get ready to sell
                    </div>
                  </div>
                  <div className="text-[12px] text-gray-500">
                    Here&apos;s a guide to get started. As your business grows,
                    you&apos;ll get fresh tips and insights here.
                  </div>
                </div>
                <div className="border rounded-2xl space-y-2  gap-2 p-4 w-[50%] bg-white">
                  <div className="text-[#667085] space-y-2  ">
                    <div className="text-[12px] text-gray-500 ">
                      To be eligible for creating a store or uploading products,
                      users must first establish a community presence by
                      creating and contributing at least one post in the
                      community.
                    </div>
                    <div
                      className={`space-y-1 w-full transition-all ${
                        highlight && !onecom ? "animate-highlight" : ""
                      }`}
                    >
                      <div className="flex justify-between ">
                        <div
                          className={`${
                            highlight &&
                            !onecom &&
                            "text-blue-600 font-semibold"
                          } text-[12px]
                          `}
                        >
                          Create Your Community
                        </div>
                      </div>
                      <div className="relative w-full h-[10px] bg-gray-100 rounded-full">
                        <div
                          className={`absolute top-0 left-0 h-full ${
                            !onecom ? "w-[0%]" : "w-[100%]"
                          } ${
                            highlight && "bg-gray-500"
                          } bg-green-500 rounded-full`}
                        ></div>
                      </div>
                    </div>

                    <div
                      className={`space-y-1 w-full transition-all ${
                        highlight && post === 0 ? "animate-highlight" : ""
                      }`}
                    >
                      <div className="flex justify-between">
                        <div
                          className={`${
                            highlight &&
                            post === 0 &&
                            "text-blue-600 font-semibold"
                          } text-[12px]`}
                        >
                          Share a Post in your Community
                        </div>
                      </div>
                      <div className="relative w-full h-[10px] bg-gray-100 rounded-full">
                        <div
                          className={`absolute top-0 left-0 h-full ${
                            post === 0 ? "w-[0%]" : "w-[100%]"
                          } ${
                            highlight && "bg-gray-500"
                          }   bg-green-500 rounded-full`}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="text-[18px] font-semibold">Setup store</div>
                  <div className="text-[12px] text-gray-500">
                    Use this personalized guide to get your store up and running
                  </div>
                  <div className="text-[12px] p-1 px-4 rounded-xl w-fit border">
                    0/3 completed
                  </div>
                  <div className="flex text-[12px] font-semibold bg-slate-50 p-2 flex-col gap-1 w-full">
                    Set up guide to get your store up and running
                  </div>
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2 p-2 text-[14px] rounded-lg bg-white w-full">
                      {/* <FaRegCircleCheck /> */}
                      <LuCirclePlus />
                      Start with registering and verifying .
                    </div>

                    <div
                      onClick={handleRegisterClick}
                      className={`"flex items-center gap-2 px-4 p-1 hover:bg-blue-500  select-none cursor-pointer  text-[12px] text-center w-fit border rounded-xl bg-white" ${
                        onecom && post > 0
                          ? "bg-blue-600 text-white"
                          : "bg-slate-50"
                      }`}
                    >
                      Register now
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2 p-2 text-[14px] rounded-lg bg-white w-full">
                      {/* <FaRegCircleCheck /> */}
                      <LuCirclePlus />
                      Create Collection
                    </div>
                    {/* <div className="flex items-center gap-2 p-2 text-[12px] w-fit border rounded-xl bg-white">
                      register now
                    </div> */}
                  </div>
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2 p-2 text-[14px] rounded-lg bg-white w-full">
                      {/* <FaRegCircleCheck /> */}
                      <LuCirclePlus />
                      Add your first product
                    </div>
                    {/* <div className="flex items-center gap-2 p-2 text-[12px] w-fit border rounded-xl bg-white">
                      register now
                    </div> */}
                  </div>
                  {/* <div className="flex items-center gap-2 p-2  text-[11px] text-[#363636] rounded-lg bg-white w-full">
                    Check Out our
                    <a className="text-blue-600 cursor-pointer ">
                      term & conditions
                    </a>
                    for store
                  </div> */}
                </div>
              </div>
              {/* register store  pop up */}
              <div
                className={`duration-100 ${
                  pop === false
                    ? "w-[0%] h-[0%]"
                    : "flex absolute overflow-auto top-0 border bottom-0 rounded-2xl  right-0 left-0 w-full justify-center pn:max-vs:text-sm items-center h-full "
                }`}
              >
                <div
                  className={` duration-500 ${
                    pop === false
                      ? " opacity-0"
                      : "bg-white opacity-100 h-full p-3 w-full rounded-2xl "
                  }`}
                >
                  <div className="flex justify-between border-b pb-2 items-center">
                    <div className="flex flex-col">
                      <div className="text-[16px] font-semibold">
                        Continue to Setup Your Store
                      </div>
                      <div className="text-[12px] text-gray-500">
                        Enter The Remaining Details
                      </div>
                    </div>
                    <div className="flex justify-center items-center gap-2">
                      <button
                        onClick={() => setPop(false)}
                        className=" rounded-lg text-center p-2 text-black "
                      >
                        Cancel
                      </button>
                      {loading ? (
                        <button
                          disabled
                          className=" p-2 flex justify-center items-center rounded-lg bg-[#5570F1] text-white"
                        >
                          <RiLoader2Line className="text-lg animate-spin text-white" />
                        </button>
                      ) : (
                        <button
                          disabled={loading}
                          className={` p-2 px-4 text-center rounded-xl ${
                            agreeTerms ? "bg-[#5570F1]" : "bg-[#7f90e4]"
                          }  text-white`}
                          onClick={registerstore}
                        >
                          Submit
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 pt-2 bg-white text-[14px] gap-2 w-full">
                    {/* house no  */}
                    <div className="flex flex-col gap-1 w-full">
                      <div className="text-sm flex gap-1 items-center font-medium">
                        Address
                        <FaAsterisk className="text-[10px] text-red-600" />
                      </div>
                      <input
                        type="text"
                        placeholder="x block, street name"
                        className="border outline-none p-2 rounded-lg"
                        value={houseNo}
                        onChange={(e) => setHouseNo(e.target.value)}
                      />
                    </div>

                    <div className="grid pp:grid-cols-2 gap-2 w-full">
                      {/* Landmark  */}
                      <div className="flex flex-col gap-1 w-full">
                        <div className="text-sm flex gap-1 items-center font-medium">
                          Famous Landmark{" "}
                          <FaAsterisk className="text-[10px] text-red-800" />
                        </div>
                        <input
                          type="text"
                          placeholder="Enter Landmark"
                          className="outline-none p-2 border rounded-lg"
                          value={landmark}
                          onChange={(e) => setLandmark(e.target.value)}
                        />
                      </div>
                      {/* postal code */}
                      <div className="flex flex-col gap-1 w-full">
                        <div className="text-sm flex gap-1 items-center font-medium">
                          Postal Code
                          <FaAsterisk className="text-[10px] text-red-800" />
                        </div>
                        <input
                          type="number"
                          maxLength={6}
                          placeholder="Enter Postal Code"
                          className="outline-none p-2 border rounded-lg"
                          value={store.d4}
                          onChange={handlePin}
                        />
                      </div>
                      {/* city */}
                      <div className="flex flex-col gap-1 w-full">
                        <div className="text-sm flex gap-1 items-center font-medium">
                          City
                          <FaAsterisk className="text-[10px] text-red-800" />
                        </div>
                        <input
                          type="text"
                          placeholder="we can auto fill City with your postal code"
                          className="outline-none p-2 border rounded-lg"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                        />
                      </div>
                      {/* state  */}
                      <div className="flex flex-col gap-1 w-full">
                        <div className="text-sm flex gap-1 items-center font-medium">
                          State
                          <FaAsterisk className="text-[10px] text-red-800" />
                        </div>
                        <input
                          type="text"
                          placeholder="we can auto fill State with your postal code"
                          className="outline-none p-2 border rounded-lg"
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                      <div className="text-sm flex gap-1 items-center font-medium">
                        GST Number (Optional)
                      </div>
                      <input
                        type="text"
                        placeholder="If your business is registered with GST Number"
                        className="border outline-none p-2 rounded-lg"
                        value={gst}
                        onChange={(e) => setGst(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-col gap-1 w-full">
                      <div className="text-sm flex gap-1 items-center font-medium">
                        Enter PAN or Aadhaar Number
                        <FaAsterisk className="text-[10px] text-red-800" />
                      </div>
                      <input
                        type="text"
                        placeholder="Please Enter PAN or Aadhaar Number to verify your identity"
                        className="border outline-none p-2 rounded-lg"
                        value={docs}
                        onChange={(e) => setDocs(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label htmlFor="fileInputagain">
                        <div className="mb-1  flex items-center gap-1">
                          Upload Document for Verification
                          <FaAsterisk className="text-[10px] text-red-800" />
                        </div>
                        {docimage ? (
                          <div className=" flex items-center">
                            <img
                              src={URL.createObjectURL(docimage)}
                              alt="image"
                              className="max-w-[100px] h-[100px] bg-slate-100 rounded-md border object-cover"
                            />
                          </div>
                        ) : (
                          <div className="border text-[#bdbcbc] pn:max-pp:p-16 p-6 border-dashed dark:border-white rounded-xl flex justify-center items-center">
                            <FaPlus />
                          </div>
                        )}
                      </label>
                      <input
                        type="file"
                        id="fileInputagain"
                        className="hidden"
                        onChange={(e) =>
                          setDocimage(e.target.files ? e.target.files[0] : null)
                        }
                      />
                    </div>
                    {/* Banking Details */}
                    <div className="text-black font-semibold text-[16px]">
                      Banking Details:
                    </div>
                    {/* Bank Name */}
                    <div className="flex flex-col gap-1 w-full">
                      <div className="text-sm flex gap-1 items-center font-medium">
                        Bank Account No.
                        <FaAsterisk className="text-[10px] text-red-800" />
                      </div>
                      <input
                        type="text"
                        placeholder="Account Number"
                        className="border outline-none p-2 rounded-lg"
                        value={bankingdetails?.AccountNo}
                        onChange={(e) =>
                          setBankingDetails({
                            ...bankingdetails,
                            AccountNo: e.target.value,
                          })
                        }
                      />
                    </div>
                    {/* IFSC */}
                    <div className="flex flex-col gap-1 w-full">
                      <div className="text-sm flex gap-1 items-center font-medium">
                        IFSC
                        <FaAsterisk className="text-[10px] text-red-800" />
                      </div>
                      <input
                        type="text"
                        placeholder="IFSC code"
                        className="border outline-none p-2 rounded-lg"
                        value={bankingdetails?.IFSC}
                        onChange={(e) =>
                          setBankingDetails({
                            ...bankingdetails,
                            IFSC: e.target.value,
                          })
                        }
                      />
                    </div>
                    {/* Account Holder Name */}
                    <div className="flex flex-col gap-1 w-full">
                      <div className="text-sm flex gap-1 items-center font-medium">
                        Account Holder&apos;s Name
                        <FaAsterisk className="text-[10px] text-red-800" />
                      </div>
                      <input
                        type="text"
                        placeholder="Account Holder's Name"
                        className="border outline-none p-2 rounded-lg"
                        value={bankingdetails?.accholdername}
                        onChange={(e) =>
                          setBankingDetails({
                            ...bankingdetails,
                            accholdername: e.target.value,
                          })
                        }
                      />
                    </div>
                    {/* T&C */}
                    <div className="mt-4 bg-gray-50 p-4 border rounded-lg text-sm text-gray-700 space-y-3">
                      <div className="font-semibold text-base text-gray-800">
                        Store Registration Terms & Conditions
                      </div>

                      <ul className="list-disc pl-5 space-y-2">
                        <li>
                          <span className="font-medium">Location Access:</span>{" "}
                          We require your current geolocation to verify the
                          authenticity and operational area of your store.
                          Location access is mandatory to proceed.
                        </li>
                        <li>
                          <span className="font-medium">
                            User Responsibility:
                          </span>{" "}
                          You are solely responsible for the accuracy of your
                          location data. If incorrect information is submitted,
                          you will bear any consequences or losses that arise.
                          The platform is not liable for disputes or delivery
                          issues caused by inaccurate location details.
                        </li>
                        <li>
                          <span className="font-medium">No Legal Claims:</span>{" "}
                          By submitting this form, you waive the right to
                          initiate legal action against the platform for
                          location-related disputes or any operational
                          limitations caused by false or misrepresented data.
                        </li>
                        <li>
                          <span className="font-medium">
                            Earnings & Platform Fee:
                          </span>{" "}
                          You may create multiple product collections within
                          your store. For every order you receive, the platform
                          will deduct a standard platform fee from the total
                          order value. The remaining amount will be credited to
                          your account as per the selected payout cycle.
                        </li>
                        <li>
                          <span className="font-medium">Payout Policy:</span>{" "}
                          All earnings will be disbursed to the bank details
                          provided during registration. Please ensure that your
                          banking information is accurate and matches your
                          identity to avoid payout failures.
                        </li>
                        <li>
                          <span className="font-medium">Compliance:</span>{" "}
                          Submitting fake or misleading details, including
                          identity or banking info, may lead to store suspension
                          or permanent ban from the platform.
                        </li>
                      </ul>

                      <div className="flex items-start gap-2 pt-2">
                        <input
                          type="checkbox"
                          id="agreeLocationTerms"
                          checked={agreeTerms}
                          onChange={() => setAgreeTerms(!agreeTerms)}
                          className="mt-1 cursor-pointer"
                        />
                        <label
                          htmlFor="agreeLocationTerms"
                          className="cursor-pointer leading-snug text-gray-800"
                        >
                          I have read and agree to the above Terms & Conditions.
                          I also consent to share my device’s location for store
                          verification and accept the platform policies
                          regarding earnings, data, and identity.
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className=" w-full rounded-2xl space-y-2 flex items-center flex-col justify-center h-[100%] p-2">
                <div className="border rounded-2xl space-y-2  gap-2 p-2 w-[40%] bg-white">
                  <div className="rounded-xl bg-red-50 p-4 flex gap-2 justify-center items-center">
                    <IoStorefrontOutline className="text-red-600 text-[25px]" />
                  </div>
                  <div className="text-[#667085] space-y-2 font-semibold ">
                    <div className="text-[14px] text-gray-500 text-center ">
                      Please give us 24 hours to verify your store registration
                      request.
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        // if store is registered and verified
        <div className="w-full h-full relative">
          {/* top models  */}
          <div className="flex gap-2 pn:max-sm:flex-col sm:h-[130px] w-full justify-between items-center">
            <div className="flex w-full h-full gap-2 items-center">
              {/* data 1 */}
              <div className="border w-full rounded-2xl h-[100%] space-y-2 flex justify-between flex-col p-2 bg-white">
                <div className="rounded-full bg-green-100 w-10 h-10 flex justify-center items-center">
                  <PiClipboardText className="text-green-600 text-[25px]" />
                </div>
                <div>
                  <div className="text-[#667085] font-semibold">Earnings</div>
                  {isLoading ? (
                    <div className="text-[18px]">...</div>
                  ) : (
                    <div className="text-[18px]">
                      ₹
                      {data?.earnwithus?.totalEarning
                        ? data?.earnwithus?.totalEarning
                        : 0}
                    </div>
                  )}
                </div>
              </div>
              {/* data 2 */}
              <div className="border w-full bg-white rounded-2xl space-y-2 flex justify-between flex-col h-[100%] p-2">
                <div className="rounded-full bg-purple-100 w-10 h-10 flex justify-center items-center">
                  <BsPeople className="text-purple-600 text-[25px]" />
                </div>
                <div>
                  <div className=" text-[#667085] font-semibold">Customers</div>
                  <div className="text-[20px]">
                    {" "}
                    {data?.earnwithus?.customers
                      ? data?.earnwithus?.customers
                      : 0}
                  </div>
                </div>
              </div>
            </div>
            {/* data 3 */}
            <div className="border w-full bg-white rounded-2xl space-y-2 flex justify-center items-center flex-col h-[100%] p-2">
              {/* <div className="flex justify-between  gap-1 "></div> */}

              <div className="flex   w-[100%] justify-between items-center ">
                <div className=" text-black  font-semibold">
                  Track your Products
                </div>
                <Link
                  href={"/main/OrderTrack"}
                  className="bg-yellow-400 text-black hover:bg-[#fffdbf] active:bg-[#f1f36d] cursor-pointer font-medium rounded-[12px] px-6 py-3 flex justify-center items-center"
                >
                  View Analytics
                </Link>
                {/* Status */}
                {/* <div className="  flex flex-col items-center ">
                <div className="rounded-full bg-blue-100 w-10 h-10 flex justify-center items-center">
                  <FiShoppingBag className="text-blue-600 text-[25px]" />
                </div>
                <div className="text-[#667085] font-semibold">All orders</div>
                <div className="text-center">0</div>
              </div>
              <div className="flex flex-col items-center ">
                <div className="rounded-full bg-red-100 w-10 h-10 flex justify-center items-center">
                  <MdPendingActions className="text-red-600 text-[25px]" />
                </div>
                <div className="text-[#667085] font-semibold">Pending</div>
                <div className="text-center">0</div>
              </div>
              <div className=" flex flex-col items-center">
                <div className="rounded-full bg-green-100 w-10 h-10 flex justify-center items-center">
                  <FaCircleCheck className="text-green-600 text-[25px]" />
                </div>
                <div className="text-[#667085] font-semibold">Completed</div>
                <div className="text-center">0</div>
              </div> */}
              </div>
            </div>
          </div>
          {/* pop up for creating collection */}
          <div className="h-[calc(100%-130px)] pt-2 overflow-auto">
            {collpopup ? (
              <div
                // onClick={() => {
                //   setCollpopup(false);
                // }}
                className="h-full w-full bg-[#1717170d] backdrop-blur-sm absolute z-20 flex justify-center items-center top-0"
              >
                <div className="p-4 rounded-xl  space-y-2 border bg-white">
                  {/* Platform Fees */}
                  {showFeeInfo && (
                    <div className="fixed inset-0 bg-[#1717170d] backdrop-blur-sm z-30 flex justify-center items-center">
                      <div className="bg-white border rounded-xl p-6 w-[90%] max-w-[500px] max-h-[80vh] overflow-auto shadow-xl relative">
                        <div className="text-[14px] text-gray-600 mb-4 leading-relaxed">
                          Platform charges a service fee per order depending on
                          the selected collection category. This fee helps us
                          ensure secure transactions, secure product delivery,
                          and continuous improvements for a better customer
                          experience.
                        </div>

                        <div className="text-[15px] font-semibold mb-3">
                          Platform Fees by Category
                        </div>

                        <div className="space-y-2 text-[14px] text-gray-700">
                          {platformFees.map((item, index) => (
                            <div
                              key={index}
                              className="flex justify-between border-b py-1"
                            >
                              <div>{item.category}</div>
                              <div>{item.fee}</div>
                            </div>
                          ))}
                        </div>

                        <div
                          onClick={() => setShowFeeInfo(false)}
                          className="absolute top-3 right-3 text-gray-500 text-[20px] cursor-pointer"
                        >
                          ✕
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="w-[300px] ">
                    <div className="flex  items-center gap-2">
                      <div className="rounded-full bg-green-100 w-10 h-10 flex justify-center items-center">
                        <LuCircleCheckBig className="text-green-600 text-[25px]" />
                      </div>
                      <div className="text-[20px] font-semibold ">
                        Collection
                      </div>
                      <div
                        onClick={() => setShowFeeInfo((prev) => !prev)}
                        className=" cursor-pointer text-gray-500 hover:text-black"
                      >
                        <IoInformationCircleOutline className="text-[16px] text-black" />
                      </div>
                    </div>
                    <div className="text-[12px] mt-2">
                      Group your products into collections for better
                      organization and visibility. Add a name and category to
                      highlight your collection.
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 text-[#667085] text-[14px]">
                    <div>Collection Name</div>
                    <input
                      value={collectionName}
                      onChange={(e) => setCollectionName(e.target.value)}
                      className="border outline-none p-2 rounded-lg"
                      placeholder="Collection Name"
                    />
                  </div>
                  <div className="flex flex-col gap-1 text-[#667085] text-[14px]">
                    <div>Collection category</div>
                    <div
                      onClick={() => setSelect((prev) => !prev)}
                      className={`  outline-none relative  ${
                        select === false
                          ? "border rounded-lg"
                          : "border rounded-t-lg"
                      }`}
                    >
                      <div className="p-2 ">
                        {!category
                          ? "Select  category for your product"
                          : category}
                      </div>
                      {select && (
                        <div
                          className={`duration-100 p-2 h-[100px] absolute  border rounded-b-xl bg-white w-full overflow-auto
                        
                     }`}
                        >
                          {Collection.map((item, index) => (
                            <div
                              onClick={() => {
                                setCategory(item.category);
                                setTimeout(() => setSelect(false), 100);
                              }}
                              className="p-2 hover:bg-slate-50 border-b"
                              key={index}
                            >
                              {item.category}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div
                    onClick={() => {
                      if (collectionName && category && !collectionres) {
                        createCollection();
                      }
                    }}
                    className="p-2 rounded-lg select-none cursor-pointer bg-[#3633ff] text-white text-[14px] text-center"
                  >
                    {collectionres ? "Creating..." : "+ Create collection"}
                  </div>
                </div>
              </div>
            ) : null}
            {/* collection data  */}
            {isStoreVerified ? (
              <div className=" flex flex-col overflow-y-auto items-center justify-center -z-10">
                {collectionData?.length > 0
                  ? collectionData?.map((d: Collection, i) => (
                      <div
                        key={i}
                        className="h-[88%] bg-slate-100 border rounded-2xl p-2 w-full overflow-auto space-y-2 pt-2 mt-[1%]"
                      >
                        <div className="flex justify-between border-b pb-2 items-center">
                          <div className="font-medium">{d?.collectionName}</div>

                          <Link
                            href={`/main/AddProduct?userId=${userId}&collectionId=${d._id}`}
                            className="flex  py-1 px-2 bg-blue-600 text-white text-[14px] font-bold items-center justify-center rounded-xl"
                          >
                            +
                          </Link>
                        </div>
                        <div className="border py-2 pn:max-sm:hidden bg-white font-semibold text-[15px] tracking-tighter flex h-[10%] items-center w-full rounded-xl">
                          <div className="w-[40%]  px-2">Product Name</div>
                          <div className="w-[10%]  text-center">In stocks</div>
                          <div className="w-[10%] text-center">Price</div>
                          {/* <div className="w-[10%] text-center ">Status</div> */}
                          <div className="w-[20%] text-center ">Orders</div>
                          {/* <div className="w-[10%] text-center">Action</div> */}
                        </div>
                        <div className="overflow-y-auto max-h-[400px] flex-col flex items-center justify-center">
                          {d?.products?.length > 0 ? (
                            d?.products.map((f: Products, i: number) => (
                              <div
                                key={i}
                                className="flex  h-[100px] pn:max-sm:justify-between items-center relative w-full"
                              >
                                <div className="sm:w-[40%] items-center gap-2 px-2 flex">
                                  <div className="h-[70px] w-[70px] rounded-lg border-2 border-white">
                                    <img
                                      src={f?.images?.[0]?.content}
                                      alt="product"
                                      className="w-[100%] h-[100%] object-cover rounded-lg"
                                    />
                                  </div>
                                  <div>
                                    <div className="font-semibold text-[16px]">
                                      {f?.name}
                                    </div>
                                    {/* <div className="font-medium text-[14px]">
                          by store owner
                        </div> */}
                                  </div>
                                </div>
                                <div className="w-[10%] text-center pn:max-sm:hidden">
                                  {f?.quantity}
                                </div>
                                <div className="w-[10%] text-center pn:max-sm:hidden">
                                  {f?.price}
                                </div>
                                <div className="w-[20%] text-center pn:max-sm:hidden">
                                  {f?.orderscount}
                                </div>
                                {/* <div className="w-[20%] text-center  pn:max-sm:hidden">
                      47.59%
                    </div> */}
                                {/* <div
                                  onClick={() => setOpen(!open)}
                                  className="sm:w-[10%] text-center flex items-center justify-center"
                                >
                                  <BsThreeDotsVertical />
                                </div> */}
                                {/* {open ? (
                                  <div className="absolute  w-[120px] bg-white  right-0 border shadow-lg rounded-2xl py-2 z-10">
                                    <button className="w-full px-4 py-2 text-sm hover:bg-gray-100 font-semibold">
                          Edit
                        </button>
                                    <button
                                      onClick={() => deleteCommunity(d._id)} // Pass community ID here
                                      className="w-full px-4 py-2 text-sm hover:bg-gray-100 font-semibold"
                                    >
                                      Delete
                                    </button>
                                  </div>
                                ) : null} */}
                              </div>
                            ))
                          ) : (
                            <div
                              // href={`/main/AddProduct?userId=${userId}&collectionId=${d._id}`}
                              className="flex p-2 px-4 text-[14px]  text-slate-600 items-center  justify-center rounded-xl"
                            >
                              Oops! No products found. Your
                              <span className="text-blue-600 px-1 font-bold">
                                earnings
                              </span>
                              are waiting for you
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  : // <div
                    //   onClick={() => {
                    //     setCollpopup(true);
                    //   }}
                    //   className="text-center p-2 mt-2 rounded-xl text-white bg-[#305ff9] max-w-[17%] pn:max-pp:text-[12px] pn:max-sm:max-w-[30%]"
                    // >
                    //   Create Collection
                    // </div>
                    null}
              </div>
            ) : null}
            <div className="flex  items-center justify-center w-full ">
              <div
                onClick={() => {
                  setCollpopup(true);
                }}
                className="text-center p-2 mt-2 rounded-xl  text-white cursor-pointer bg-[#305ff9] max-w-[17%] pn:max-pp:text-[12px] pn:max-sm:max-w-[30%]"
              >
                Create Collection
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
// const Page = () => {
//   return (
//     <Suspense fallback={<div>Loading...</div>}>
//       <PageContent />
//     </Suspense>
//   );
// };
export default PageContent;
