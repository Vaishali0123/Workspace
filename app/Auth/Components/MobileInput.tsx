import React from "react";
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
    <div className="flex flex-col gap-3">
      <div className="text-[#717171] flex flex-col gap-2 text-sm">
        <div>Mobile Number</div>
        <div className="bg-[#FAFAFA] py-1.5 flex items-center rounded-xl px-3 gap-2">
          <div className="border-r-2 pr-2">+91</div>
          <div>
            <input
              type="tel"
              value={number}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="p-1.5 outline-none bg-transparent  placeholder:text-sm"
              placeholder="Enter Mobile Number"
            />
          </div>
        </div>
        <div className="mt-1">We will send you an OTP on this number</div>
      </div>
      <div>
        <button
          disabled={loading}
          onClick={sendPhoneOtp}
          className="bg-black text-white w-full flex justify-center items-center h-12 font-medium rounded-xl"
        >
          {loading ? "Loading..." : "Continue"}
        </button>
      </div>
    </div>
  );
};

export default MobileInput;
