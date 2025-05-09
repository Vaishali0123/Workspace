import React from "react";
import Lottie from "lottie-react";
import comingSoonAnimation from "../../assets/Coming_Soon.json";

const ComingSoon = () => {
  return (
    <div className="w-full h-full relative">
      <div className="absolute inset-0  bg-white bg-opacity-50 flex items-center justify-center z-10">
        <div className=" p-6 rounded-2xl  text-center flex flex-col items-center">
          <Lottie animationData={comingSoonAnimation} className="w-40 h-40" />

          <p className="text-gray-600 text-[12px] mt-2 font-medium">
            This feature is under development.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
