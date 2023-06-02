"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  faHeart,
  faTrashCan,
  faFolder,
} from "@fortawesome/free-regular-svg-icons";

export default function FolderList({ item, trash }: any) {
  const pathname = usePathname();
  const toggleFileMenu = (id: string) => {
    let element = document.getElementById(id);

    if (element && element.style.display === "none") {
      element.style.display = "flex";
    } else if (element && element.style.display === "flex") {
      element.style.display = "none";
    }
  };
  return (
    <div className="w-full px-[14px] flex justify-between cursor-pointer items-center hover:bg-[rgba(125,211,252,0.2)]">
      <Link
        href={
          pathname === "/" ? item.folder[0] : pathname + "/" + item.folder[0]
        }
        className="w-[96%] py-[10px]"
      >
        <div className="self-center flex gap-2 items-center">
          <FontAwesomeIcon icon={faFolder} className="w-4 h-4 text-blue-700" />
          <p className="text-sm font-semibold text-[rgba(0,0,0,0.8)]">
            {item.folder[0]}
          </p>
        </div>
      </Link>
      <div className="relative self-center items-center">
        <button
          className="border-none bg-transparent"
          onClick={() => toggleFileMenu(item.folder[0])}
        >
          <FontAwesomeIcon icon={faEllipsis} className="w-3 h-3" />
        </button>
        <div
          style={{ display: "none" }}
          id={item.folder[0]}
          className="absolute right-0 z-50 top-[30px] bg-white border border-solid border-[rgba(0,0,0,0.1)] w-44 h-auto rounded shadow-[0px_1px_2px_rgba(0,0,0,0.1)] flex flex-col"
        >
          <Link
            href={
              pathname === "/"
                ? item.folder[0]
                : pathname + "/" + item.folder[0]
            }
            className="w-full border-none bg-transparent py-[6px] text-left hover:bg-[rgba(0,0,0,0.1)] px-3 text-xs font-medium text-[rgba(0,0,0,0.8)]"
          >
            Open Folder
          </Link>

          <button
            onClick={() =>
              trash(
                pathname === "/"
                  ? item.folder[0]
                  : pathname + "/" + item.folder[0],
                item.$id
              )
            }
            className="w-full border-none flex justify-between items-center bg-transparent py-[6px] text-left hover:bg-[rgba(0,0,0,0.1)] px-3 text-xs font-medium text-[rgba(0,0,0,0.8)]"
          >
            Delete Folder
            <FontAwesomeIcon
              icon={faTrashCan}
              className="w-3 h-3 text-[rgba(0,0,0,0.8)]"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
