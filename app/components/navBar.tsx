"use client";
import Logo from "./logo";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks } from "./data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faArrowRightFromBracket,
  faSliders,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart, faAddressBook } from "@fortawesome/free-regular-svg-icons";
import Loading from "./loading";
import LogOutModal from "./logOutModal";
import Search from "./search";
import { account } from "@/lib/appwriteConfig";

export default function NavBar({ onClick }: any) {
  const pathname = usePathname();
  const router = useRouter();
  const [userDetails, setUserDetails]: any = useState(null);
  const [clip, setClip] = useState("polygon(0 0, 100% 0, 100% 0, 0 0)");
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [focused, setFocused] = useState(false);

  const checkPath = (path: any) => {
    let value = true;
    if (path === "/contact" && pathname === "/contact") return value;
    if (path === "/" && pathname !== "/contact") return value;
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
            setLoading(false);
          }
        },
        (err) => {
          console.log(err);
          setLoading(false);
        }
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
          <div className="flex gap-1.5 w-[215px] max-[670px]:hidden">
            <Logo />
            <p className="font-medium">minecloud</p>
          </div>
          <div className="hidden max-[670px]:block" onClick={onClick}>
            <FontAwesomeIcon
              icon={faSliders}
              className="w-4 h-4 text-black/90 cursor-pointer"
            />
          </div>
          <div className="flex gap-1 max-[770px]:hidden">
            {navLinks.map((item) => {
              return (
                <Link
                  id="links"
                  href={item.path}
                  key={item.name}
                  className="w-auto relative duration-300 rounded h-8 px-7 flex justify-center items-center gap-1.5"
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
          <div className="relative">
            <div className="w-[210px] h-9 bg-white rounded cursor-pointer flex">
              <div className="w-9 h-9 rounded flex justify-center items-center">
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className="w-4 h-3 text-black/80"
                />
              </div>

              <input
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                type="text"
                className="w-[174px] h-9 border-none outline-none rounded bg-white text-black/80 text-sm"
                placeholder="Search anything..."
                onFocus={() => setFocused(true)}
                onBlur={() => {
                  setTimeout(() => {
                    setFocused(false);
                  }, 250);
                }}
              />
            </div>
            {focused && (
              <Search value={searchValue} email={userDetails.email} />
            )}
          </div>
          {userDetails && (
            <div className="relative">
              <div
                onClick={toggleClip}
                className="self-center w-h-9 h-9 rounded-[50%] cursor-pointer bg-red-300 flex justify-center items-center text-white font-medium text-base"
              >
                {userDetails.email[0].toUpperCase()}
              </div>
              <div
                style={{ clipPath: clip }}
                className="absolute duration-500 top-10 right-0 w-[220px] h-auto bg-white rounded border border-solid border-black/10 shadow-[1px_1px_3px_black/10] pt-3 pb-2"
              >
                <div className="w-full flex gap-1 items-center px-3">
                  <div className=" w-[25px] h-[25px] rounded-[50%] cursor-pointer bg-red-300 flex justify-center items-center text-white font-medium text-sm">
                    {userDetails.email[0].toUpperCase()}
                  </div>
                  <p className="text-[13px] text-black/80 font-medium">
                    {userDetails.name}
                  </p>
                </div>
                <p className="text-xs py-[6px] text-black/80 font-medium px-3">
                  Signed In As: {userDetails.email}
                </p>
                <div className="flex flex-col w-full">
                  <Link
                    onClick={() => toggleClip()}
                    href={"/favourite&"}
                    className=" text-xs flex items-center justify-between py-1.5 px-3 hover:bg-black/10"
                  >
                    Favourite Files
                    <FontAwesomeIcon
                      icon={faHeart}
                      className="w-2.5 h-2.5 text-black/80"
                    />
                  </Link>
                  <Link
                    onClick={() => toggleClip()}
                    href={"/contact&"}
                    className=" text-xs flex justify-between items-center py-1.5 px-3 hover:bg-black/10"
                  >
                    Privacy Policy
                    <FontAwesomeIcon
                      icon={faAddressBook}
                      className="w-2.5 h-2.5 text-black/80"
                    />
                  </Link>
                  <button
                    onClick={() => {
                      toggleClip();
                      setModal(true);
                    }}
                    className=" text-xs flex items-center justify-between py-1.5 px-3 hover:bg-black/10"
                  >
                    SignOut
                    <FontAwesomeIcon
                      icon={faArrowRightFromBracket}
                      className="w-2.5 h-2.5 text-black/80"
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
