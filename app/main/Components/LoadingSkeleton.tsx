const LoadingSkeleton = () => {
    return (
      <div className="h-full sm:overflow-hidden space-y-2 animate-pulse">
        {/* Header Skeleton */}
        <div className="h-[60px] w-full p-2 flex justify-between items-center bg-white border rounded-xl">
          <div className="flex items-center justify-between w-full">
            <div className="h-7 w-32 bg-slate-200 rounded-lg"></div>
            <div className="flex items-center gap-2">
              <div className="h-9 w-20 bg-slate-200 rounded-xl"></div>
              <div className="h-9 w-20 bg-slate-200 rounded-xl"></div>
            </div>
          </div>
        </div>
  
        {/* Main Content Skeleton */}
        <div className="h-[calc(98%-60px)] border rounded-2xl overflow-hidden relative">
          <div className="p-4">
            {/* Profile Image Skeleton */}
            <div className="py-2 flex-col flex w-full items-center gap-2 justify-center">
              <div className="h-[80px] w-[80px] rounded-[32px] bg-slate-200"></div>
              <div className="h-4 w-20 bg-slate-200 rounded-lg"></div>
            </div>
  
            <div className="h-[calc(100%-150px)] flex">
              {/* Left Side Skeleton */}
              <div className="flex flex-col gap-4 h-full w-[80%] items-center">
                <div className="w-full space-y-2">
                  <div className="h-4 w-32 bg-slate-200 rounded-lg"></div>
                  <div className="h-10 w-full bg-slate-200 rounded-lg"></div>
                </div>
                <div className="w-full space-y-2">
                  <div className="h-4 w-40 bg-slate-200 rounded-lg"></div>
                  <div className="h-24 w-full bg-slate-200 rounded-lg"></div>
                </div>
              </div>
  
              {/* Right Side Skeleton */}
              <div className="flex flex-col gap-4 h-full w-full items-center">
                <div className="flex flex-col gap-2 h-full w-[80%]">
                  <div className="h-4 w-24 bg-slate-200 rounded-lg"></div>
                  <div className="flex gap-2">
                    <div className="h-10 w-24 bg-slate-200 rounded-xl"></div>
                    <div className="h-10 w-24 bg-slate-200 rounded-xl"></div>
                    <div className="h-10 w-24 bg-slate-200 rounded-xl"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default LoadingSkeleton;