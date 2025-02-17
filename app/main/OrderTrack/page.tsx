"use client";
import React, { useEffect, useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import { BiWallet } from "react-icons/bi";
import { FiShoppingBag } from "react-icons/fi";
import axios from "axios";
import { API } from "@/app/utils/helpers";
import { useAuthContext } from "@/app/Auth/Components/auth";

const Page = () => {
  const { data } = useAuthContext();
  const userId = data?.id;
  const [orderData, setOrderData] = useState([]);
  const getorder = async () => {
    try {
      const res = await axios.get(`${API}/getOrder/${userId}`);
      setOrderData(res?.data?.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getorder();
  }, [userId]);
  return (
    <div className="w-full space-y-[10px]  pn:max-sm:p-2 h-full">
      <div className="flex gap-2 w-full md:h-[140px]">
        {/* Orders */}
        <div className="rounded-2xl bg-white border border-[#f1f4f9] p-2 w-[50%] h-[100%] pn:max-sm:w-full pn:max-sm:h-full">
          <div className="rounded-2xl bg-orange-100 w-10 h-10 flex justify-center items-center">
            <IoCartOutline className="text-orange-600 text-[25px]" />
          </div>
          <div className="mt-4 text-[#667085] font-semibold">Total Orders</div>
          <div className="flex items-center gap-3">
            <div className="text-[20px]">1,298</div>
            <div className="rounded-full bg-green-100 text-green-600 px-2 text-[12px] font-semibold flex justify-center items-center">
              +10%
            </div>
          </div>
        </div>
        {/* Balance */}
        <div className="rounded-2xl bg-white border border-[#f1f4f9] p-2 w-[50%] h-[100%] pn:max-sm:w-full pn:max-sm:h-full">
          <div className="rounded-2xl bg-red-100 w-10 h-10 flex justify-center items-center">
            <BiWallet className="text-red-600 text-[25px]" />
          </div>
          <div className="mt-4 text-[#667085] font-semibold">Total Balance</div>
          <div className="flex items-center gap-3">
            <div className="text-[20px]">₹1,298</div>
            <div className="rounded-full bg-red-100 text-red-600 px-2 text-[12px] font-semibold flex justify-center items-center">
              -10%
            </div>
          </div>
        </div>
        {/* Type */}
        <div className="rounded-2xl bg-white border border-[#f1f4f9] p-2 w-[50%] h-[100%] pn:max-sm:w-full pn:max-sm:h-full">
          <div className="rounded-2xl bg-blue-100 w-10 h-10 flex justify-center items-center">
            <FiShoppingBag className="text-blue-600 text-[25px]" />
          </div>
          <div className="flex mt-3 justify-between text-[#667085] font-semibold">
            <div className="">Cancellled</div>
            <div className="">Returned</div>
            <div className="">Damaged</div>
          </div>
          <div className="flex mt-2 justify-between  ml-5 ">
            <div className="">0</div>
            <div className="">0</div>
            <div className="flex ">
              <div className="">0</div>
              <div className="text-green-600 px-1 py-1 text-[10px] font-semibold flex  items-center shadow-sm">
                +10%
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Details */}
      <div className="bg-red-600">
        <div className="bg-[#f1f4f9] flex rounded-t-xl text-sm font-semibold h-[50px] items-center p-2">
          <div className="w-[15%]">Order Id</div>
          <div className="w-[25%]">Product</div>
          <div className="w-[15%] text-center">Date</div>
          <div className="w-[15%] text-center">Total</div>
          <div className="w-[15%] text-center">Customer</div>
          <div className="w-[15%] text-center">Payment Mode</div>
          <div className="w-[15%] text-center">Status</div>
        </div>

        {/* Order Details */}
        <div className=" h-[calc(100%-1000px)] overflow-auto rounded-b-xl  p-2 text-[12px]">
          {orderData?.map((item: any, index: any) => (
            <div key={index} className="flex border-b py-2 items-center">
              <div className="w-[15%] ">#{item?.orderId}</div>
              <div className="w-[25%] flex items-center gap-2 px-2">
                <div className="w-12 h-12">
                  <img
                    src={item?.data?.[0]?.productId?.images?.[0]?.content}
                    alt="workspace"
                    width={50}
                    height={50}
                    className="rounded-md object-cover"
                  />
                </div>
                <div>
                  <div className="">{item?.data?.[0]?.productId?.name}</div>
                  <div className="text-xs">+1 product</div>
                </div>
              </div>

              <div className="w-[15%] text-center">{item?.createdAt}</div>
              <div className="w-[15%] text-center">
                ₹{item?.data?.[0]?.totalprice}
              </div>
              <div className="w-[15%] text-center">Vaishali Gupta</div>
              <div className="w-[15%] text-center">COD</div>
              <div className="w-[15%] text-center flex justify-center">
                <div className="rounded-full w-fit bg-green-100 text-green-600 px-4 py-1 text-xs font-semibold">
                  {item?.data?.[0]?.currentStatus}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
