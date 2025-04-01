import React from "react";
import { RiLoaderLine } from "../../utils/comimports";
const MobileInput = ({
  loading,
  number,
  setPhoneNumber,
  sendPhoneOtp,
}: {
  loading: boolean;
  number: string;
  setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
  sendPhoneOtp: (e: React.FormEvent) => Promise<void>;
}) => {
  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex flex-col px-2 gap-2 w-full">
        <div className="bg-white border rounded-xl text-[14px] p-2 w-full">
          <div className="text-[#6a6a6a] text-[14px]">Phone no.</div>
          <div className="flex">
            <div className="text-[#999999]">+91</div>
            <input
              type="tel"
              value={number}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="px-2 outline-none w-full"
              placeholder="XXXXXXXXXXX"
            />
          </div>
        </div>
        <div className="mt-1 px-2 text-[14px] text-[#6a6a6a]">
          We will send you an OTP on this number
        </div>
      </div>

      <div className="px-2">
        <button
          disabled={loading || number.length < 10}
          onClick={sendPhoneOtp}
          className="bg-black text-white w-full font-medium flex justify-center cursor-pointer active:bg-[#171717] hover:bg-[#2e2e2e] items-center h-12 rounded-2xl"
        >
          {loading ? (
            <RiLoaderLine size={20} className="animate-spin" />
          ) : (
            "Continue"
          )}
        </button>
      </div>
    </div>
  );
};

export default MobileInput;
