import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faDownload } from "@fortawesome/free-solid-svg-icons";
import { faHeart, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import Image from "next/image";
import { storage } from "../../lib/appwriteConfig";

export default function FileList({
  item,
  trash,
  clickedFavourite,
  inFavourite,
}: any) {
  const toggleFileMenu = (id: string) => {
    let element = document.getElementById(id);

    if (element && element.style.display === "none") {
      element.style.display = "flex";
    } else if (element && element.style.display === "flex") {
      element.style.display = "none";
    }
  };

  const imageLoader = () => {
    return `${item.imageURL}`;
  };

  return (
    <div className="w-full px-3.5 py-2.5 flex justify-between cursor-pointer items-center hover:bg-lightBlueShade">
      <div
        className="self-center w-ninetyFivePercent flex gap-2 items-center"
        onDoubleClick={() => window.open(item.link, "_blank")}
      >
        <Image
          loader={imageLoader}
          width={28}
          height={28}
          src={item.imageURL}
          alt="File"
          className=" rounded-[50%]"
        />

        <p className="text-sm font-semibold w-3/4 overflow-x-hidden overflow-y-hidden h-5 self-center text-black/80">
          {item.name}
        </p>
      </div>

      {inFavourite !== "Yes" && (
        <div className="relative self-center items-center">
          <button
            className="border-none bg-transparent"
            onClick={() => toggleFileMenu(item.id)}
          >
            <FontAwesomeIcon icon={faEllipsis} className="w-3 h-3" />
          </button>
          <div
            style={{ display: "none" }}
            id={item.id}
            className="absolute right-0 z-50 top-[30px] bg-white border border-solid border-black/10 w-44 h-auto rounded shadow-[0px_1px_2px_black/10] flex flex-col"
          >
            <button
              className="w-full border-none bg-transparent py-1.5 text-left hover:bg-black/10 px-3 text-xs font-medium text-black/80"
              onClick={() => {
                toggleFileMenu(item.id);
                window.open(item.link, "_blank");
              }}
            >
              Open File
            </button>
            <button
              className="w-full border-none flex justify-between bg-transparent py-1.5 text-left hover:bg-black/10 px-3 text-xs font-medium text-black/80"
              onClick={() => {
                toggleFileMenu(item.id);
                const promise = storage.getFileDownload(
                  "64748172a5b0bd8409dd",
                  item.id
                );
                window.open(promise.href, "_blank");
              }}
            >
              Download File
              <FontAwesomeIcon
                icon={faDownload}
                className="w-3 h-3 text-black/80"
              />
            </button>

            <button
              className="w-full border-none flex justify-between bg-transparent py-1.5 text-left hover:bg-black/10 px-3 text-xs font-medium text-black/80"
              onClick={() => {
                trash(item.id);
                toggleFileMenu(item.id);
              }}
            >
              Delete File
              <FontAwesomeIcon
                icon={faTrashCan}
                className="w-3 h-3 text-black/80"
              />
            </button>
            <button
              onClick={clickedFavourite}
              className="w-full border-none flex justify-between items-center bg-transparent py-1.5 text-left hover:bg-black/10 px-3 text-xs font-medium text-black/80"
            >
              {item.isFavourite === "Yes"
                ? "Remove from Favourite"
                : "Add to favourite"}
              <FontAwesomeIcon
                icon={faHeart}
                className="w-3 h-3 text-black/80"
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
