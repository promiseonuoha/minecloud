"use client";
import Logo from "./logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks } from "./data";
import { account } from "../appwrite/appwriteConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function NavBar() {
  const pathname = usePathname();
  const [userDetails, setUserDetails]: any = useState(null);

  const checkPath = (path: any) => {
    let value = true;
    if (path === "/contact&" && pathname === "/contact&") return value;
    if (path === "/" && pathname !== "/contact&") return value;
  };

  useEffect(() => {
    const promise = account.get();
    promise.then(
      (res) => setUserDetails(res),
      (err) => console.log(err)
    );
  }, []);

  return (
    <nav className="w-full flex justify-between items-center">
      <div className="flex gap-6">
        <div className="flex gap-[5px] w-[215px]">
          <Logo />
          <p className="font-medium">minecloud</p>
        </div>
        <div className="flex gap-1">
          {navLinks.map((item) => {
            return (
              <Link
                id="links"
                href={item.path}
                key={item.name}
                className="w-auto relative duration-300 rounded h-[32px] px-[28px] flex justify-center items-center gap-[6px]"
                style={{
                  backgroundColor: `${
                    checkPath(item.path) ? "white" : "transparent"
                  }`,
                  color: `${
                    checkPath(item.path) ? "rgb(29,78,216)" : "rgba(0,0,0,0.7)"
                  }`,
                }}
              >
                <p className="text-sm duration-300 text-inherit">{item.name}</p>
                <FontAwesomeIcon
                  icon={item.icon}
                  className="w-3 h-3 text-inherit"
                />
              </Link>
            );
          })}
        </div>
      </div>
      <div className="flex gap-4 items-center self-center">
        <div className="w-[210px] h-[35px] bg-white rounded cursor-pointer flex">
          <div className="w-9 h-[35px] rounded flex justify-center items-center">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="w-4 h-3 text-[rgba(0,0,0,0.8)]"
            />
          </div>
          <div className="relative">
            <input
              type="text"
              className="w-[174px] h-[35px] border-none outline-none rounded bg-white text-[rgba(0,0,0,0.8)] text-sm"
              placeholder="Search anything..."
            />
          </div>
        </div>

        {userDetails && (
          <div className="self-center w-[35px] h-[35px] rounded-[50%] cursor-pointer bg-red-300 flex justify-center items-center text-white font-medium text-base">
            {userDetails.email[0].toUpperCase()}
          </div>
        )}
      </div>
    </nav>
  );
}
