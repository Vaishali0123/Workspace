"use client";
import React, { use, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { PiClipboardText } from "react-icons/pi";
import { BsPeople } from "react-icons/bs";
import { FiShoppingBag } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store"; // Adjust the import path as necessary
import axios from "axios";
import { API } from "@/app/utils/helpers";
import { useEffect } from "react";
import Link from "next/link";
import { useAuthContext } from "@/app/Auth/Components/auth";
import { IoStorefrontOutline } from "react-icons/io5";
import { RiLoader2Line } from "react-icons/ri";
import { FaAsterisk, FaPlus } from "react-icons/fa6";
import toast from "react-hot-toast";
import { setIfCode } from "@/app/redux/slices/userSlice";
import { LuCircleCheckBig } from "react-icons/lu";
// import { useAuthContext } from "@/app/components/auth";
const useLocation = () => {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      return;
    }

    navigator.permissions
      .query({ name: "geolocation" })
      .then((permissionStatus) => {
        if (permissionStatus.state === "granted") {
          getLocation();
        } else if (permissionStatus.state === "prompt") {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              setLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              });
            },
            (error) => {
              setLocationError(error.message);
            }
          );
        } else {
          setLocationError("Location permission denied");
        }
      })
      .catch((err) => setLocationError(err.message));
  }, []);

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        setLocationError(error.message);
      }
    );
  };

  return { location, locationError };
};

const Page = () => {
  const [pop, setPop] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [houseNo, setHouseNo] = useState("");
  const [pincode, setPincode] = useState("");
  const [landmark, setLandmark] = useState("");
  const [gst, setGst] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [docs, setDocs] = useState("");
  const [docimage, setDocimage] = useState<File | null>(null);
  const { location, locationError } = useLocation();
  const [store, setStore] = useState({ d2: "", d3: "", d4: "" });
  const [collectionName, setCollectionName] = useState("");
  const [select, setSelect] = useState(false);
  const [category, setCategory] = useState("");
  const { data } = useAuthContext();
  const userId = data?.id;
  const isStoreVerified = data?.isStoreVerified;
  const dispatch = useDispatch();
  const [collpopup, setCollpopup] = useState(false);
  const Collection = [
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
  // Register store
  const registerstore = async () => {
    // if (!location) {
    //   toast.error("Location is required to register store");
    //   return;
    // }
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("houseNo", houseNo);
      formData.append("pincode", pincode);
      formData.append("landmark", landmark);
      formData.append("gst", gst);
      formData.append("state", state);
      formData.append("city", city);
      formData.append("docs", docs);
      formData.append("storepic", docimage);

      const response = await axios.post(
        `${API}/registerstore/${data?.id}`,
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
    try {
      const formData = new FormData();
      formData.append("collectionName", collectionName);
      formData.append("category", category);
      console.log(userId, data?.storeid);
      const response = await axios.post(
        `${API}/createcollection/${userId}/${data?.storeid}`,
        {
          collectionName: collectionName,
          category: category,
        }
      );

      if (response.data.success) {
        toast.success("Successfully created collection");
        setCollpopup(false);
      }
    } catch (error) {
      console.error(error);
    }
  };
  // Get collection
  // const getCollection = async () => {
  //   try {
  //     const response = await axios.get(`${API}/getcollection/${userId}`);
  //     console.log(response.data, "ljigygyhn");
  //     if (response.data.success) {
  //       setCollectionData(response?.data);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }

  //   console.log(collectionData, "collectionData");
  // };
  // useEffect(() => {
  //   getCollection();
  // }, [userId]);
  return (
    <>
      {isStoreVerified === false ? (
        <div className="w-full h-full rounded-2xl overflow-hidden relative">
          {/* register store  */}
          {!setIfCode === false ? (
            <>
              <div className=" w-full  rounded-2xl space-y-2 flex items-center flex-col justify-center h-[100%] p-2">
                <div className="border rounded-2xl space-y-2  gap-2 p-2 w-[40%] bg-white">
                  <div className="rounded-xl bg-red-50 p-4 flex gap-2 items-end">
                    <IoStorefrontOutline className="text-red-600 text-[25px]" />
                    <div className="text-[14px] text-[#667085]">
                      Ready to setup your store! Here's Your 3-Step Guide
                    </div>
                  </div>
                  <div className="text-[#667085] space-y-2 font-semibold ">
                    <div className="text-[12px] text-gray-500 ">
                      To be eligible for creating a store or uploading products,
                      users must first establish a community presence by
                      creating and contributing at least one post in the
                      community."
                    </div>
                    <div className="space-y-1 w-full">
                      <div className="flex justify-between font-semibold">
                        <div className="text-[12px]">Create Your Community</div>
                        <div className="text-[12px]">10 Members</div>
                      </div>
                      <div className="relative w-full h-[10px] bg-gray-100 rounded-full">
                        <div className="absolute top-0 left-0 h-full w-[70%] bg-blue-400 rounded-full"></div>
                      </div>
                    </div>
                    <div className="space-y-1 w-full">
                      <div className="flex justify-between font-semibold">
                        <div className="text-[12px]">Create Content</div>
                        <div className="text-[12px]">10% Engagement rate</div>
                      </div>
                      <div className="relative w-full h-[10px] bg-gray-100 rounded-full">
                        <div className="absolute top-0 left-0 h-full w-[70%] bg-blue-400 rounded-full"></div>
                      </div>
                    </div>
                    <div className="space-y-1 pt-1 flex justify-end w-full">
                      <div
                        onClick={() => setPop(true)}
                        className="flex items-center font-semibold gap-1 rounded-xl w-full justify-center px-4 py-2 text-[12px]  bg-blue-600 text-white"
                      >
                        Register Store
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* register store  pop up */}
              <div
                className={`duration-100 ${
                  pop === false
                    ? "w-[0%] h-[0%]"
                    : "flex absolute top-0 border bottom-0 rounded-2xl  right-0 left-0 w-full justify-center pn:max-vs:text-sm items-center h-full "
                }`}
              >
                <div
                  className={` duration-500 ${
                    pop === false
                      ? " opacity-0"
                      : "bg-white opacity-100 h-full p-3 w-full rounded-lg "
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
                          className=" p-2 px-4 text-center rounded-xl bg-[#5570F1] text-white"
                          onClick={registerstore}
                        >
                          Submit
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 pt-2 text-[14px] gap-2 w-full">
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
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className=" w-full rounded-2xl space-y-2 flex items-center flex-col justify-center h-[100%] p-2">
                <div className="border rounded-2xl space-y-2  gap-2 p-2 w-[40%] bg-white">
                  <div className="rounded-xl bg-red-50 p-4 flex gap-2 items-end">
                    <IoStorefrontOutline className="text-red-600 text-[25px]" />
                  </div>
                  <div className="text-[#667085] space-y-2 font-semibold ">
                    <div className="text-[12px] text-gray-500 ">
                      Please with for 24 hours to verify your store
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        // if store is registered
        <div className="w-full h-full rounded-2xl overflow-hidden relative">
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
                  <div className="text-[18px]">₹1,298</div>
                </div>
              </div>
              {/* data 2 */}
              <div className="border w-full bg-white rounded-2xl space-y-2 flex justify-between flex-col h-[100%] p-2">
                <div className="rounded-full bg-purple-100 w-10 h-10 flex justify-center items-center">
                  <BsPeople className="text-purple-600 text-[25px]" />
                </div>
                <div>
                  <div className=" text-[#667085] font-semibold">Customers</div>
                  <div className="text-[20px]">298</div>
                </div>
              </div>
            </div>
            {/* data 3 */}
            <div className="border w-full bg-white rounded-2xl space-y-2 flex justify-between flex-col h-[100%] p-2">
              <div className="rounded-full bg-blue-100 w-10 h-10 flex justify-center items-center">
                <FiShoppingBag className="text-blue-600 text-[25px]" />
              </div>
              <div className="flex bg-white gap-1 justify-between ">
                <div className=" ">
                  <div className="text-[#667085] font-semibold">All orders</div>
                  <div className="text-center">0</div>
                </div>
                <div className=" ">
                  <div className="text-[#667085] font-semibold">Pending</div>
                  <div className="text-center">0</div>
                </div>
                <div className=" ">
                  <div className="text-[#667085] font-semibold">Completed</div>
                  <div className="text-center">0</div>
                </div>
              </div>
            </div>
          </div>
          {/* pop up for collection */}
          {collpopup ? (
            <div className="h-full w-full bg-[#1717170d] backdrop-blur-sm absolute flex justify-center items-center top-0">
              <div className="p-4 rounded-xl space-y-2 border bg-white">
                <div className="w-[300px]">
                  <div className="flex  items-center gap-2">
                    <div className="rounded-full bg-green-100 w-10 h-10 flex justify-center items-center">
                      <LuCircleCheckBig className="text-green-600 text-[25px]" />
                    </div>
                    <div className="text-[20px] font-semibold ">Collection</div>
                  </div>
                  <div className="text-[12px] mt-2">
                    Group your products into collections for better organization
                    and visibility. Add a name and category to highlight your
                    collection.
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
                  onClick={createCollection}
                  className="p-2 rounded-lg select-none cursor-pointer bg-[#3633ff] text-white text-[14px] text-center"
                >
                  + create collection
                </div>
              </div>
            </div>
          ) : null}
          {/* collection data  */}
          {isStoreVerified ? (
            <div className="pt-2 -z-10">
              {
                <div className="h-[88%] bg-red-100 border rounded-2xl p-2 w-full overflow-auto space-y-2 pt-2 mt-[1%]">
                  <div className="flex justify-between border-b pb-2 items-center">
                    <div className="font-semibold">Name of collection</div>
                    <Link
                      href="/main/AddProduct"
                      className="flex px-4 p-2 text-[14px] bg-blue-600 text-white items-center justify-center rounded-xl"
                    >
                      Add product
                    </Link>
                  </div>
                  <div className="border py-2 pn:max-sm:hidden bg-white font-semibold text-[15px] tracking-tighter flex h-[10%] items-center w-full rounded-xl">
                    <div className="w-[40%]  px-2">Product Name</div>
                    <div className="w-[10%]  text-center">In stocks</div>
                    <div className="w-[10%] text-center">Price</div>
                    <div className="w-[10%] text-center ">Status</div>
                    <div className="w-[20%] text-center ">Date</div>
                    <div className="w-[10%] text-center">Action</div>
                  </div>
                  {/* <div className="flex h-[100px] pn:max-sm:justify-between items-center relative w-full">
                    <div className="sm:w-[40%] items-center gap-2 px-2 flex">
                      <div className="h-[70px] w-[70px] rounded-lg border-2 border-white"></div>
                      <div>
                        <div className="font-semibold text-[16px]">
                          Product name
                        </div>
                        <div className="font-medium text-[14px]">
                          by store owner
                        </div>
                      </div>
                    </div>
                    <div className="w-[10%] text-center pn:max-sm:hidden">
                      4
                    </div>
                    <div className="w-[10%] text-center pn:max-sm:hidden">
                      1.01k
                    </div>
                    <div className="w-[10%] text-center pn:max-sm:hidden">
                      101k
                    </div>
                    <div className="w-[20%] text-center  pn:max-sm:hidden">
                      47.59%
                    </div>
                    <div
                      onClick={() => setOpen(!open)}
                      className="sm:w-[10%] text-center flex items-center justify-center"
                    >
                      <BsThreeDotsVertical />
                    </div>
                    {open ? (
                      <div className="absolute  w-[120px] bg-white  right-0 border shadow-lg rounded-2xl py-2 z-10">
                        <button className="w-full px-4 py-2 text-sm hover:bg-gray-100 font-semibold">
                          Edit
                        </button>
                        <button
                          // onClick={() => deleteCommunity(d._id)} // Pass community ID here
                          className="w-full px-4 py-2 text-sm hover:bg-gray-100 font-semibold"
                        >
                          Delete
                        </button>
                        <button
                          // onClick={() => openPopup(d._id)} // Open popup for specific community
                          className="w-full px-4 py-2 text-sm hover:bg-gray-100 font-semibold"
                        >
                          Posts
                        </button>
                      </div>
                    ) : null}
                  </div> */}
                </div>
              }
            </div>
          ) : (
            <div>No collection available</div>
          )}
        </div>
      )}
    </>
  );
};

export default Page;
