"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API } from "@/app/utils/helpers";
import { useAuthContext } from "@/app/Auth/Components/auth";
import toast from "react-hot-toast";

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

const Order = () => {
  const { data } = useAuthContext();
  const userId = data?.id;
  const [orderData, setOrderData] = useState<Orders[]>([]);
  // const [storeearning, setStoreearning] = useState(0);
  // const [totalorders, setTotalorders] = useState(0);
  // const [pendingorders, setPendingorders] = useState(0);
  // const [completedorders, setCompletedorders] = useState(0);
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
      // let totalOrders = 0;
      // let pendingOrders = 0;
      // let completedOrders = 0;
      if (res?.data?.success) {
        if (res?.data?.data?.storeid?.collectionId?.length > 0) {
          res?.data?.data?.storeid?.collectionId?.forEach(
            (item: Collection) => {
              item?.products?.map((product: Orders) => {
                setOrderData((prev) => [...prev, product]);
                // setTotalorders((prev) => prev + product?.orderscount);
                // setPendingorders((prev) => prev + product?.pendingordercount);
                // setCompletedorders((prev) => prev + product?.completedordercount);
                productsArray.push(product);
                // totalOrders += product?.orderscount || 0;
                // pendingOrders += product?.pendingordercount || 0;
                // completedOrders += product?.completedordercount || 0;
              });
            }
          );
        }
        // setOrderData(productsArray);
        // setTotalorders(totalOrders);
        // setPendingorders(pendingOrders);
        // setCompletedorders(completedOrders);
        // setStoreearning(res?.data?.data?.storeid?.storeearning);
      }
    } catch (e) {
      toast.error("Something went wrong");
      console.log(e);
    }
  };
  useEffect(() => {
    if (userId) {
      trackorders();
    }
  }, [userId]);
  return (
    <div>
      <div className="bg-[#f1f4f9] rounded-t-2xl  flex  text-sm font-semibold h-[50px] items-center p-2">
        <div className="w-[25%] ">Product Name</div>
        {/* <div className="w-[15%]">#</div>
    <div className="w-[25%]">Name</div> */}
        <div className="w-[15%] text-center">Price</div>
        <div className="w-[15%] text-center text-blue-500">Total orders</div>
        <div className="w-[15%] text-center text-yellow-500">
          Pending orders
        </div>
        <div className="w-[15%] text-center text-green-500">
          Successful orders
        </div>
        <div className="w-[15%] text-center text-gray-500">Added to Cart</div>
      </div>
      {/* Order Details */}
      <div className=" h-[calc(100%-1000px)]   overflow-auto rounded-b-xl  p-2 text-[12px]">
        {orderData?.map((item: Orders, index: number) => (
          <div key={index} className="flex border-b py-2 items-center">
            {/* <div className="w-[15%] ">#{item?.orderId}</div> */}
            <div className="w-[25%] flex items-center gap-2 px-2">
              <div className="w-12  h-12 border rounded-[16px]">
                <img
                  src={item?.images?.[0]?.content}
                  alt="workspace"
                  width={50}
                  height={50}
                  className="rounded-[16px] object-cover"
                />
              </div>
              <div className="w-[25%] flex items-center gap-2 px-2 font-semibold">
                {item?.name}
              </div>
            </div>

            <div className="w-[15%] text-center">₹{item?.price}</div>
            <div className="w-[15%] text-center">{item?.orderscount}</div>

            <div className="w-[15%] text-center">{item?.pendingordercount}</div>
            <div className="w-[15%] text-center">
              {item?.completedordercount}
            </div>
            <div className="w-[15%] text-center">0</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
