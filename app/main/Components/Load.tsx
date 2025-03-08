import React from "react";

function Load() {
  return (
    <div className="h-full pn:max-sm:p-2 space-y-2 w-full">
      {/* Shimmer effect for the first set of boxes */}
      <div className="flex gap-2 pn:max-sm:flex-col w-full justify-between items-center">
        <div className="border w-full rounded-2xl h-[100%] space-y-2 flex gap-2 items-center p-2 bg-white shimmer-effect">
          <div className="rounded-full bg-green-100 w-10 h-10 flex justify-center items-center shimmer"></div>
          <div className="shimmer w-[70%] h-6"></div>
        </div>
        <div className="border w-full bg-white rounded-2xl space-y-2 flex gap-2 items-center h-[100%] p-2 shimmer-effect">
          <div className="rounded-full bg-purple-100 w-10 h-10 flex justify-center items-center shimmer"></div>
          <div className="shimmer w-[70%] h-6"></div>
        </div>
        <div className="border w-full bg-white rounded-2xl space-y-2 flex gap-2 items-center h-[100%] p-2 shimmer-effect">
          <div className="rounded-full bg-blue-100 w-10 h-10 flex justify-center items-center shimmer"></div>
          <div className="shimmer w-[70%] h-6"></div>
        </div>
      </div>
      {/* Shimmer effect for the second set of boxes */}
      <div className="flex gap-2 pn:max-sm:flex-col w-full justify-between items-center">
        <div className="border w-full rounded-2xl h-[100%] space-y-2 flex gap-2 p-2 bg-white shimmer-effect">
          <div className="rounded-full bg-green-100 w-10 h-10 flex justify-center items-center shimmer"></div>
          <div className="shimmer w-[70%] h-6"></div>
        </div>
        <div className="border w-full rounded-2xl h-[100%] space-y-2 flex gap-2 p-2 bg-white shimmer-effect">
          <div className="rounded-full bg-green-100 w-10 h-10 flex justify-center items-center shimmer"></div>
          <div className="shimmer w-[70%] h-6"></div>
        </div>
        <div className="border w-full rounded-2xl h-[100%] space-y-2 flex gap-2 p-2 bg-white shimmer-effect">
          <div className="rounded-full bg-green-100 w-10 h-10 flex justify-center items-center shimmer"></div>
          <div className="shimmer w-[70%] h-6"></div>
        </div>
      </div>
    </div>
  );
}

export default Load;
