import React from "react";
import { RiLoaderLine } from "../../utils/comimports";

const EmailInput = ({
  email,
  loading,
  setEmail,
  sendEmailOtp,
}: {
  email: string;
  loading: boolean;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  sendEmailOtp: (e: React.FormEvent) => Promise<void>;
}) => {
  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex flex-col px-2 gap-2 w-full ">
        <div className="bg-white border rounded-xl text-[14px] p-2 w-full">
          <div className="text-[#6a6a6a]">Email Address</div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-2 outline-none w-full"
            placeholder="abc@mail.com"
          />
        </div>
        <div className="mt-1 px-2 text-[14px] text-[#6a6a6a]">
          We will send you an OTP on this email
        </div>
      </div>

      <div className="px-2">
        <button
          disabled={loading || !email}
          onClick={sendEmailOtp}
          className="bg-black text-white w-full font-medium cursor-pointer active:bg-[#171717] hover:bg-[#2e2e2e] flex justify-center items-center h-12 rounded-2xl"
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

export default EmailInput;
