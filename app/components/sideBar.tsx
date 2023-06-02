"use client";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePathname } from "next/navigation";
import { sideBarLinks } from "./data";

export default function SideBar() {
  const pathname = usePathname();

  const checkPath = (path: any) => {
    let value = true;
    if (path === "/contact&" && pathname === "/contact&") return value;
    if (path === "/" && pathname !== "/contact&" && pathname !== "/favourite&")
      return value;
  };

  return (
    <div className="w-[215px] h-[80vh] bg-white rounded-lg border border-solid border-[rgba(0,0,0,0.1)] flex flex-col justify-between p-[15px]">
      <div className="w-full flex flex-col gap-1">
        {sideBarLinks.map((item) => {
          return (
            <Link
              href={item.path}
              key={item.name}
              className="p-[8px] flex justify-between items-center rounded"
              style={{
                color: `${
                  checkPath(item.path) ? "rgb(29,78,216)" : "rgba(0,0,0,0.89)"
                }`,
                backgroundColor: `${
                  checkPath(item.path) ? "rgba(125,211,252,0.2)" : "transparent"
                }`,
              }}
            >
              <div className="flex gap-2 items-center">
                <FontAwesomeIcon
                  icon={item.icon}
                  className="text-inherit w-[14px] h-[14px]"
                />
                <p className="text-sm ">{item.name}</p>
              </div>
              {item.iconTwo && (
                <div className="flex items-center">
                  <FontAwesomeIcon
                    icon={item.iconTwo}
                    className="w-3 h-3 text-[rgba(0,0,0,0.7)]"
                  />
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
