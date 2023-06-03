"use client";
import Logo from "./logo";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks } from "./data";
import { account } from "../appwrite/appwriteConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart, faAddressBook } from "@fortawesome/free-regular-svg-icons";
import Loading from "./loading";
import LogOutModal from "./logOutModal";

export default function NavBar() {
  const pathname = usePathname();
  const router = useRouter();
  const [userDetails, setUserDetails]: any = useState(null);
  const [clip, setClip] = useState("polygon(0 0, 100% 0, 100% 0, 0 0)");
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);

  const checkPath = (path: any) => {
    let value = true;
    if (path === "/contact&" && pathname === "/contact&") return value;
    if (path === "/" && pathname !== "/contact&") return value;
  };

  const handleLogout = () => {
    setLoading(true);
    const promise = account.deleteSession("current");

    setTimeout(() => {
      promise.then(
        () => {
          if (pathname === "/") {
            window.location.reload();
          } else {
            router.push("/");
          }
        },
        (err) => console.log(err)
      );
    }, 3000);
  };

  const toggleClip = () => {
    clip === "polygon(0 0, 100% 0, 100% 0, 0 0)"
      ? setClip("polygon(0 0, 100% 0, 100% 100%, 0 100%)")
      : setClip("polygon(0 0, 100% 0, 100% 0, 0 0)");
  };

  useEffect(() => {
    const promise = account.get();
    promise.then(
      (res) => setUserDetails(res),
      (err) => console.log(err)
    );
  }, []);

  return (
    <>
      {loading && <Loading />}
      {modal && (
        <LogOutModal
          cancel={() => {
            setModal(false);
          }}
          logout={() => {
            setModal(false);
            handleLogout();
          }}
        />
      )}
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
                      checkPath(item.path)
                        ? "rgb(29,78,216)"
                        : "rgba(0,0,0,0.7)"
                    }`,
                  }}
                >
                  <p className="text-sm duration-300 text-inherit">
                    {item.name}
                  </p>
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
            <div className="relative">
              <div
                onClick={toggleClip}
                className="self-center w-[35px] h-[35px] rounded-[50%] cursor-pointer bg-red-300 flex justify-center items-center text-white font-medium text-base"
              >
                {userDetails.email[0].toUpperCase()}
              </div>
              <div
                style={{ clipPath: clip }}
                className="absolute duration-500 top-[40px] right-0 w-[220px] h-auto bg-white rounded border border-solid border-[rgba(0,0,0,0.1)] shadow-[1px_1px_3px_rgba(0,0,0,0.1)] p-3"
              >
                <div className="w-full flex gap-1 items-center ">
                  <div className=" w-[25px] h-[25px] rounded-[50%] cursor-pointer bg-red-300 flex justify-center items-center text-white font-medium text-sm">
                    {userDetails.email[0].toUpperCase()}
                  </div>
                  <p className="text-[13px] text-[rgba(0,0,0,0.8)] font-medium">
                    {userDetails.name}
                  </p>
                </div>
                <p className="text-xs py-[6px] text-[rgba(0,0,0,0.8)] font-medium ">
                  Signed In As: {userDetails.email}
                </p>
                <div className="flex flex-col w-full">
                  <Link
                    onClick={() => toggleClip()}
                    href={"/favourite&"}
                    className=" text-xs flex items-center gap-1 py-[9px] pl-[6px] hover:bg-[rgba(0,0,0,0.1)]"
                  >
                    Favourite Files
                    <FontAwesomeIcon
                      icon={faHeart}
                      className="w-[10px] h-[10px] text-[rgba(0,0,0,0.8)]"
                    />
                  </Link>
                  <Link
                    onClick={() => toggleClip()}
                    href={"/contact&"}
                    className=" text-xs flex items-center gap-1 py-[9px] pl-[6px] hover:bg-[rgba(0,0,0,0.1)]"
                  >
                    {"  Developer's Contact"}
                    <FontAwesomeIcon
                      icon={faAddressBook}
                      className="w-[10px] h-[10px] text-[rgba(0,0,0,0.8)]"
                    />
                  </Link>
                  <button
                    onClick={() => {
                      toggleClip();
                      setModal(true);
                    }}
                    className=" text-xs flex items-center gap-[6px] py-[9px] pl-[6px] hover:bg-[rgba(0,0,0,0.1)]"
                  >
                    SignOut
                    <FontAwesomeIcon
                      icon={faArrowRightFromBracket}
                      className="w-[10px] h-[10px] text-[rgba(0,0,0,0.8)]"
                    />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
