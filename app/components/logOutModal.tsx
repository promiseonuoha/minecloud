"use client";
import { useState, useEffect } from "react";

export default function LogOutModal({ cancel, logout }: any) {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    setOpacity(1);
  }, []);

  return (
    <div className="absolute w-screen h-screen left-0 top-0 bg-black/10 z-50 flex justify-center items-center">
      <div
        style={{ opacity: opacity }}
        className="flex flex-col duration-700 rounded bg-white w-[250px] p-3"
      >
        <p className="pb-1 text-sm font-medium text-black/80">Are you sure</p>
        <p className="pb-3 text-sm font-medium text-black/80">
          You want to LogOut?
        </p>
        <div className=" flex justify-between w-full items-center">
          <button
            onClick={cancel}
            className="w-fourtyEightPercent py-2.5 border border-solid hover:scale-105 border-black/10 text-black/80 text-xs rounded"
          >
            Cancel
          </button>
          <button
            onClick={logout}
            className="w-fourtyEightPercent py-2.5 bg-blue-700 hover:scale-105 border-none text-white text-xs rounded"
          >
            LogOut
          </button>
        </div>
      </div>
    </div>
  );
}
