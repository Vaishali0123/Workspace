import React from "react";

const Page = () => {
  return (
    <div className="h-full w-full bg-white border sm:rounded-2xl p-2">
      <div className="w-full py-2 border-b">Default template</div>
      <div className="w-full flex flex-wrap gap-2 py-2 pt-4">
        <div className="h-[200px]  pn:max-sm:w-full w-[250px] relative rounded-xl border">
          <img
            className="w-full h-full object-cover rounded-xl"
            src="/images/1.jpg"
            alt="template 1"
          />
          {/* <div className="absolute -top-2 -right-2 text-white bg-red-500 p-1 px-2 rounded-lg">
            <MdDeleteOutline />
          </div> */}
          <div className="w-full flex px-2 justify-between py-2 rounded-b-xl items-center border-t absolute bottom-0 bg-white">
            <div className=" text-[14px]"> Basic Layout</div>
            <div className="p-1 px-4 rounded-full text-white font-medium bg-[#3af] text-[12px]">
              use
            </div>
          </div>
        </div>
      </div>
      <div className="w-full py-2 border-b">Custom template</div>
    </div>
  );
};

export default Page;
