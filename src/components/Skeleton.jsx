const Skeleton = () => {
  return (
    <div className="shadow bg-base-300 rounded-md p-4 max-w-sm w-80 mx-auto mt-16 h-[500px]">
      <div className="animate-pulse flex flex-col space-x-4">
        <div className="bg-slate-700 h-52 w-full"></div>
        <div className="flex-1 space-y-6 py-1">
          <div className="my-5 h-2 bg-slate-700 rounded"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-5 gap-4">
              <div className="my-5 h-2 bg-slate-700 rounded col-span-5"></div>
              <div className="my-5 h-2 bg-slate-700 rounded col-span-1"></div>
              <div className="my-5 h-2 bg-slate-700 rounded col-span-1"></div>
              <div className="my-5 h-2 bg-slate-700 rounded col-span-1"></div>
              <div className="my-5 h-2 bg-slate-700 rounded col-span-1"></div>
            </div>
            <div className="h-2 bg-slate-700 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
