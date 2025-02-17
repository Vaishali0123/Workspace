"use client";
import { setProduct } from "@/app/redux/slices/productSlice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const page = () => {
  const [yes, setYes] = useState(false);
  const dispatch = useDispatch();

  return (
    <div className="h-full w-full flex pn:max-md:flex-col">
      <div className="w-[50%] pn:max-md:w-full pn:max-md:h-full p-2 space-y-2">
        {/* general information section */}
        <div className="p-2 border bg-white rounded-xl">
          <div className="font-semibold text-[18px] p-1">
            General information
          </div>
          <div className="p-1">
            <div className="text-[14px] flex justify-between items-center font-semibold text-slate-600">
              Product Name <div>(0/100)</div>
            </div>
            <input
              onChange={(e) => {
                // dispatch(setProduct({ productname: e.target.value }));
              }}
              type="text"
              placeholder="Product Name"
              className="p-1 w-full border rounded-lg"
            />
          </div>
          <div className="p-1">
            <div className="text-[14px] flex justify-between items-center font-semibold text-slate-600">
              Product Description <div>(0/200)</div>
            </div>
            <textarea
              //   onChange={(e) => {
              //     dispatch();
              //   }}
              placeholder="Product description"
              className="p-1 h-[100px] w-full border rounded-lg"
            />
          </div>
        </div>
        {/* media section */}
        <div className="p-2 border bg-white rounded-xl">
          <div className="font-semibold flex gap-1 items-center text-[18px] p-1">
            Media
            <div className="text-[14px] text-slate-600">
              (Images, video or 3D models)
            </div>
          </div>
          <div className="p-1 w-full flex flex-col items-center space-y-2 justify-center">
            <div className="text-[14px] w-full text-start flex justify-between items-center font-semibold text-slate-600">
              Add Media Name<div>(0/5)</div>
            </div>
            <div className="flex gap-2 items-center flex-wrap ">
              <input
                type="file"
                placeholder="ADD"
                className="p-1 border rounded-lg h-[100px] w-[100px] flex items-center justify-center"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-[50%] pn:max-md:w-full pn:max-md:h-full p-2 space-y-2 ">
        {/* Pricing section  */}
        <div className="p-2 border bg-white rounded-xl">
          <div className="font-semibold text-[18px] p-1">Pricing</div>
          <div className="flex pn:max-md:flex-col gap-2 w-full">
            <div className="p-1 w-full">
              <div className="text-[14px] flex justify-between items-center font-semibold text-slate-600">
                Selling price
              </div>
              <input
                type="Number"
                placeholder="Product M.R.P"
                className="p-1 w-full border rounded-lg"
              />
            </div>
            <div className="p-1  w-full">
              <div className="text-[14px] flex justify-between items-center font-semibold text-slate-600">
                Discount price
              </div>
              <input
                type="Number"
                placeholder="Product Discount"
                className="p-1 w-full border rounded-lg"
              />
            </div>
          </div>
          <div className="p-1 pn:max-md:w-full md:w-[50%]">
            <div className="text-[14px] flex justify-between items-center font-semibold text-slate-600">
              Quantity
            </div>
            <input
              type="Number"
              placeholder="Product In Stock"
              className="p-1 w-full border rounded-lg"
            />
          </div>
          <div className="p-1 w-full gap-2 flex items-center">
            <input
              type="checkbox"
              className="bg-[#5570F1] h-[15px] w-[15px] "
            />
            <div className="text-[16px] font-medium flex justify-between items-center text-[#5570F1]">
              This product includes GST
            </div>
          </div>
        </div>
        {/* Shipping section  */}
        <div className="p-2 border bg-white rounded-xl">
          <div className="font-semibold text-[18px] p-1">Shipping</div>

          <div className="p-1 w-full gap-2 flex items-center">
            {/* switcher  */}
            <div
              onClick={() => setYes(!yes)}
              className="h-[20px] w-[40px] rounded-xl bg-[#5570F1] relative "
            >
              <div
                className={` h-[18px] w-[18px] duration-150 bg-white rounded-3xl absolute ${
                  yes === false
                    ? " right-[1px] left-auto top-[1.2px] "
                    : " left-[1px] right-auto top-[1.2px] "
                }`}
              ></div>
            </div>
            {/* ---  */}
            <div className="text-[16px] flex justify-between items-center font-medium text-[#5570F1]">
              This product shipped by Grovyo
            </div>
          </div>
          <div className="flex pn:max-md:flex-col gap-2 w-full">
            <div className="p-1 w-full">
              <div className="text-[14px] flex justify-between items-center font-semibold text-slate-600">
                Weight
              </div>
              <input
                type="Number"
                placeholder="Product weight"
                className="p-1 w-full border rounded-lg"
              />
            </div>
            <div className="p-1  w-full">
              <div className="text-[14px] flex justify-between items-center font-semibold text-slate-600">
                Height
              </div>
              <input
                type="Number"
                placeholder="Product height"
                className="p-1 w-full border rounded-lg"
              />
            </div>
          </div>
        </div>
        {/* Different Options section  */}
        <div className="p-2 border bg-white rounded-xl">
          <div className="font-semibold text-[18px] p-1">Variant Options</div>
          <div className="p-1 w-full gap-2 flex items-center">
            <input
              type="checkbox"
              className="bg-[#5570F1] h-[15px] w-[15px] "
            />
            <div className="text-[16px] flex justify-between font-medium items-center ">
              This product has variants
            </div>
          </div>
          <div className="flex pn:max-md:flex-col gap-2 w-full">
            <div className="p-1 w-full">
              <div className="text-[14px] flex justify-between items-center font-semibold text-slate-600">
                Type
              </div>
              <input
                type="Number"
                placeholder="Product M.R.P"
                className="p-1 w-full border rounded-lg"
              />
            </div>
            <div className="p-1  w-full">
              <div className="text-[14px] flex justify-between items-center font-semibold text-slate-600">
                Value
              </div>
              <input
                type="Number"
                placeholder="Product Discount"
                className="p-1 w-full border rounded-lg"
              />
            </div>
          </div>
          <div className="p-1 hover:underline cursor-pointer font-medium text-[#5570F1] text-[16px] flex justify-between items-center ">
            Add More
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
