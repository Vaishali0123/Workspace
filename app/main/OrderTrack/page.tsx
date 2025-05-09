"use client";
import React, { useEffect, useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import { BiWallet } from "react-icons/bi";
import { FiShoppingBag } from "react-icons/fi";
import axios from "axios";
import { API, errorHandler } from "@/app/utils/helpers";
import { useAuthContext } from "@/app/Auth/Components/auth";

import Order from "./order/Order";

interface Orders {
  orderId: string;

  createdAt: string;
  images: Images[];
  name: string;
  price: string;
  orderscount: number;
  pendingordercount: number;
  completedordercount: number;
}
interface Images {
  content: string;
}
interface Collection {
  products: Orders[];
}

const Page = () => {
  const { data } = useAuthContext();
  const userId = data?.id;
  // const [orderData, setOrderData] = useState<Orders[]>([]);
  const [storeearning, setStoreearning] = useState(0);
  const [totalorders, setTotalorders] = useState(0);
  const [pendingorders, setPendingorders] = useState(0);
  const [completedorders, setCompletedorders] = useState(0);
  // const getorder = async () => {
  //   try {
  //     const res = await axios.get(`${API}/getOrder/${userId}`);
  //     setOrderData(res?.data?.data);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
  const trackorders = async () => {
    try {
      const res = await axios.get(`${API}/trackSellerOrder/${userId}`);
      const productsArray: Orders[] = [];
      let totalOrders = 0;
      let pendingOrders = 0;
      let completedOrders = 0;
      if (res?.data?.success) {
        if (res?.data?.data?.storeid?.collectionId?.length > 0) {
          res?.data?.data?.storeid?.collectionId?.forEach(
            (item: Collection) => {
              item?.products?.map((product: Orders) => {
                // setOrderData((prev) => [...prev, product]);
                // setTotalorders((prev) => prev + product?.orderscount);
                // setPendingorders((prev) => prev + product?.pendingordercount);
                // setCompletedorders((prev) => prev + product?.completedordercount);
                productsArray.push(product);
                totalOrders += product?.orderscount || 0;
                pendingOrders += product?.pendingordercount || 0;
                completedOrders += product?.completedordercount || 0;
              });
            }
          );
        }
        // setOrderData(productsArray);
        setTotalorders(totalOrders);
        setPendingorders(pendingOrders);
        setCompletedorders(completedOrders);
        setStoreearning(res?.data?.data?.storeid?.storeearning);
      }
    } catch (e) {
      errorHandler(e);
    }
  };
  useEffect(() => {
    if (userId) {
      trackorders();
    }
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
            <div className="text-[20px]">{totalorders}</div>
            {/* <div className="rounded-full bg-green-100 text-green-600 px-2 text-[12px] font-semibold flex justify-center items-center">
              +10%
            </div> */}
          </div>
        </div>
        {/* Balance */}
        <div className="rounded-2xl bg-white border border-[#f1f4f9] p-2 w-[50%] h-[100%] pn:max-sm:w-full pn:max-sm:h-full">
          <div className="rounded-2xl bg-red-100 w-10 h-10 flex justify-center items-center">
            <BiWallet className="text-red-600 text-[25px]" />
          </div>
          <div className="mt-4 text-[#667085] font-semibold">Total Balance</div>
          <div className="flex items-center gap-3">
            <div className="text-[20px]">₹{storeearning}</div>
            {/* <div className="rounded-full bg-red-100 text-red-600 px-2 text-[12px] font-semibold flex justify-center items-center">
              -10%
            </div> */}
          </div>
        </div>
        {/* Type */}
        <div className="rounded-2xl bg-white border border-[#f1f4f9] p-4 w-[50%] h-[100%] pn:max-sm:w-full pn:max-sm:h-full shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-blue-100 w-12 h-12 flex justify-center items-center">
              <FiShoppingBag className="text-blue-600 text-[28px]" />
            </div>
            <div className="text-[14px] font-bold text-[#344054]">
              Order Summary
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-4  text-center">
            <div>
              <div className="text-[12px] text-[#667085] font-medium">
                Successful
              </div>
              <div className="text-[20px] font-semibold text-green-600">
                {completedorders}
              </div>
            </div>

            <div>
              <div className="text-[12px] text-[#667085] font-medium">
                Pending
              </div>
              <div className="text-[20px] font-semibold text-orange-500">
                {pendingorders}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Details */}
      <div>
        <Order />
      </div>
    </div>
  );
};

export default Page;
