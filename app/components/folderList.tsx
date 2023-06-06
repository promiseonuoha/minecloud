"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { faTrashCan, faFolder } from "@fortawesome/free-regular-svg-icons";

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
    <div className="w-full px-3.5 flex justify-between cursor-pointer items-center hover:bg-lightBlueShade">
      <Link
        href={
          pathname === "/" ? item.folder[0] : pathname + "/" + item.folder[0]
        }
        className="w-ninetyFivePercent py-2.5"
      >
        <div className="self-center flex gap-2 items-center">
          <FontAwesomeIcon icon={faFolder} className="w-4 h-4 text-blue-700" />
          <p className="text-sm font-semibold text-black/80">
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
          className="absolute right-0 z-50 top-[30px] bg-white border border-solid border-black/10 w-44 h-auto rounded shadow-[0px_1px_2px_black/10] flex flex-col"
        >
          <Link
            href={
              pathname === "/"
                ? item.folder[0]
                : pathname + "/" + item.folder[0]
            }
            className="w-full border-none bg-transparent py-1.5 text-left hover:bg-black/10 px-3 text-xs font-medium text-black/80"
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
            className="w-full border-none flex justify-between items-center bg-transparent py-1.5 text-left hover:bg-black/10 px-3 text-xs font-medium text-black/80"
          >
            Delete Folder
            <FontAwesomeIcon
              icon={faTrashCan}
              className="w-3 h-3 text-black/80"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
