import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { faHeart, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import Image from "next/image";

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
    <div className="w-full px-[14px] py-[10px] flex justify-between cursor-pointer items-center hover:bg-[rgba(125,211,252,0.2)]">
      <div
        className="self-center w-[95%] flex gap-2 items-center"
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

        <p className="text-sm font-semibold w-[75%] overflow-x-hidden text-[rgba(0,0,0,0.8)]">
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
            className="absolute right-0 z-50 top-[30px] bg-white border border-solid border-[rgba(0,0,0,0.1)] w-44 h-auto rounded shadow-[0px_1px_2px_rgba(0,0,0,0.1)] flex flex-col"
          >
            <button
              className="w-full border-none bg-transparent py-[6px] text-left hover:bg-[rgba(0,0,0,0.1)] px-3 text-xs font-medium text-[rgba(0,0,0,0.8)]"
              onClick={() => {
                toggleFileMenu(item.id);
                window.open(item.link, "_blank");
              }}
            >
              Open File
            </button>

            <button
              className="w-full border-none flex justify-between bg-transparent py-[6px] text-left hover:bg-[rgba(0,0,0,0.1)] px-3 text-xs font-medium text-[rgba(0,0,0,0.8)]"
              onClick={() => {
                trash(item.id);
                toggleFileMenu(item.id);
              }}
            >
              Delete File
              <FontAwesomeIcon
                icon={faTrashCan}
                className="w-3 h-3 text-[rgba(0,0,0,0.8)]"
              />
            </button>
            <button
              onClick={clickedFavourite}
              className="w-full border-none flex justify-between items-center bg-transparent py-[6px] text-left hover:bg-[rgba(0,0,0,0.1)] px-3 text-xs font-medium text-[rgba(0,0,0,0.8)]"
            >
              {item.isFavourite === "Yes"
                ? "Remove from Favourite"
                : "Add to favourite"}
              <FontAwesomeIcon
                icon={faHeart}
                className="w-3 h-3 text-[rgba(0,0,0,0.8)]"
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
