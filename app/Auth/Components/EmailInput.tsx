import React from "react";

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
    <div className="flex flex-col gap-3">
      <div className="text-[#717171] flex flex-col gap-2 text-sm">
        <div>Email</div>
        <div className="bg-[#FAFAFA] py-1.5 flex items-center rounded-xl px-3 gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-1.5 outline-none bg-transparent  placeholder:text-sm"
            placeholder="Enter Your Email"
          />
        </div>
        <div className="mt-1">We will send you an OTP on this email</div>
      </div>
      <div>
        <button
          disabled={loading}
          onClick={sendEmailOtp}
          className="bg-black text-white w-full flex justify-center items-center h-12 font-medium rounded-xl"
        >
          {loading ? "Loading..." : "Continue"}
        </button>
      </div>
    </div>
  );
};

export default EmailInput;
