import React from "react";
import { BsPeople } from "react-icons/bs";
import { FiShoppingBag } from "react-icons/fi";
import { PiClipboardText } from "react-icons/pi";

const Page = () => {
  return (
    <div className="h-full  pn:max-sm:p-2 space-y-2 w-full">
      <div className="flex gap-2 pn:max-sm:flex-col w-full justify-between items-center">
        {/* <div className="flex w-full h-full gap-2 items-center"> */}
        {/* data 1 */}
        <div className="border w-full rounded-2xl h-[100%] space-y-2 flex gap-2 items-center p-2 bg-white">
          <div className="rounded-full bg-green-100 w-10 h-10 flex justify-center items-center">
            <PiClipboardText className="text-green-600 text-[25px]" />
          </div>
          <div>
            <div className="text-[#667085] font-semibold">Earnings</div>
            <div className="text-[18px]">₹1,298</div>
          </div>
        </div>
        {/* data 2 */}
        <div className="border w-full bg-white rounded-2xl space-y-2 flex gap-2 items-center h-[100%] p-2">
          <div className="rounded-full bg-purple-100 w-10 h-10 flex justify-center items-center">
            <BsPeople className="text-purple-600 text-[25px]" />
          </div>
          <div>
            <div className=" text-[#667085] font-semibold">Customers</div>
            <div className="text-[20px]">298</div>
          </div>
        </div>
        {/* data 3 */}
        <div className="border w-full bg-white rounded-2xl space-y-2 flex gap-2 items-center h-[100%] p-2">
          <div className="rounded-full bg-blue-100 w-10 h-10 flex justify-center items-center">
            <FiShoppingBag className="text-blue-600 text-[25px]" />
          </div>
          <div>
            <div className=" text-[#667085] font-semibold">Customers</div>
            <div className="text-[20px]">298</div>
          </div>
        </div>
      </div>
      <div className="flex gap-2 pn:max-sm:flex-col w-full justify-between items-center">
        {/* data 1 */}
        <div className="border w-full  rounded-2xl h-[100%] space-y-2 flex gap-2 p-2 bg-white">
          <div className="rounded-full bg-green-100 w-10 h-10 flex justify-center items-center">
            <PiClipboardText className="text-green-600 text-[25px]" />
          </div>
          <div className="text-[#667085] space-y-2 font-semibold w-[80%]">
            <div className="text-gray-800 text-[15px] font-semibold flex items-center">
              Sell Products
            </div>
            <div className="text-[12px] text-gray-500 ">
              To be eligible for creating a store or uploading products, users
              must first establish a community presence by creating and
              contributing at least one post in the community."
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
              <div className="flex items-center gap-1 rounded-2xl w-full justify-center px-4 py-2 text-[12px] font-medium bg-blue-600 text-white">
                Create Product
              </div>
            </div>
          </div>
        </div>
        {/* data 2 */}
        <div className="border w-full  rounded-2xl h-[100%] space-y-2 flex gap-2 p-2 bg-white">
          <div className="rounded-full bg-green-100 w-10 h-10 flex justify-center items-center">
            <PiClipboardText className="text-green-600 text-[25px]" />
          </div>
          <div className="text-[#667085] space-y-2 font-semibold w-[80%]">
            <div className="text-gray-800 text-[15px] font-semibold flex items-center">
              Topics
            </div>
            <div className="text-[12px] text-gray-500 ">
              To be eligible for creating a store or uploading products, users
              must first establish a community presence by creating and
              contributing at least one post in the community."
            </div>
            <div className="space-y-1 w-full">
              <div className="flex justify-between font-semibold">
                <div className="text-[12px]">Create Your Community</div>
                <div className="text-[12px]">150 Members</div>
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
            <div className="space-y-2 pt-2 flex justify-end w-full">
              <div className="flex items-center gap-1 rounded-2xl w-full justify-center px-4 py-2 text-[12px] font-medium bg-blue-600 text-white">
                Create Topics
              </div>
            </div>
          </div>
        </div>
        {/* data 3 */}
        <div className="border w-full  rounded-2xl h-[100%] space-y-2 flex gap-2 p-2 bg-white">
          <div className="rounded-full bg-green-100 w-10 h-10 flex justify-center items-center">
            <PiClipboardText className="text-green-600 text-[25px]" />
          </div>
          <div className="text-[#667085] space-y-2 font-semibold w-[80%]">
            <div className="text-gray-800 text-[15px] font-semibold flex items-center">
              Ad Revenue
            </div>
            <div className="text-[12px] text-gray-500 ">
              To be eligible for creating a store or uploading products, users
              must first establish a community presence by creating and
              contributing at least one post in the community."
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
            <div className="space-y-2 pt-2 flex justify-end w-full">
              <div className="flex items-center gap-1 rounded-2xl w-full justify-center px-4 py-2 text-[12px] font-medium bg-blue-600 text-white">
                Apply
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col space-y-2 justify-end">
        {/* Transaction History */}
        <div className="text-[20px] font-semibold ">Transaction History</div>
        <div className="rounded-xl border w-full bg-white">
          <div className="bg-[#faf8fc] border-b gap-2 flex justify-between p-4 font-semibold text-[14px] rounded-t-xl">
            <div className="w-[20%] ">Transaction ID</div>
            <div className="w-[20%] text-center">Type</div>
            <div className="w-[20%] text-center">Date</div>
            <div className="w-[20%] text-center">Status </div>
            <div className="w-[20%] text-center">Amount </div>
            <div className="w-[20%] text-center">Invoice</div>
          </div>
          <div className="flex  justify-between p-4 gap-2 text-[12px] mt-3 ">
            <div className="w-[20%] ">ABW789456123</div>
            <div className="w-[20%] text-center">Pay-Out</div>
            <div className="w-[20%] text-center">08 Jan, 2022 04:39:23</div>
            <div className="w-[20%] text-center">Success </div>
            <div className="w-[20%] text-center text-red-500">Rs.540 </div>
            <div className="flex w-[20%] justify-center items-center ">
              <div className="rounded-xl border border-green-500 px-2 py-1 text-[12px] text-green-600 font-semibold">
                Download
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
