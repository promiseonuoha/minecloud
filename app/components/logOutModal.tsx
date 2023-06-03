"use client";
import { useState, useEffect } from "react";

export default function LogOutModal({ cancel, logout }: any) {
  const [transform, setTransform] = useState("translateY(-8px)");
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    setOpacity(1);
    setTimeout(() => {
      setTransform("translateY(0px)");
    }, 300);
  }, []);

  return (
    <div className="absolute w-screen h-screen left-0 top-0 bg-[rgba(0,0,0,0.1)] z-50 flex justify-center items-center">
      <div
        style={{ transform: transform, opacity: opacity }}
        className="flex flex-col duration-700 rounded bg-white w-[250px] p-3"
      >
        <p className="pb-1 text-sm font-medium text-[rgba(0,0,0,0.8)]">
          Are you sure
        </p>
        <p className="pb-3 text-sm font-medium text-[rgba(0,0,0,0.8)]">
          You want to LogOut?
        </p>
        <div className=" flex justify-between w-full items-center">
          <button
            onClick={cancel}
            className="w-[48%] py-2 border border-solid hover:scale-105 border-[rgba(0,0,0,0.1)] text-[rgba(0,0,0,0.8)] text-xs rounded"
          >
            Cancel
          </button>
          <button
            onClick={logout}
            className="w-[48%] py-2 bg-blue-700 hover:scale-105 border-none text-white text-xs rounded"
          >
            LogOut
          </button>
        </div>
      </div>
    </div>
  );
}
