"use client";
import { useState, useEffect } from "react";
import Loading from "@/app/components/loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import QuickAccess from "@/app/components/quickAccess";
import { databases, storage, account } from "@/app/appwrite/appwriteConfig";
import FileList from "@/app/components/fileList";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [files, setFiles]: any = useState([]);
  const [documents, setDocuments]: any = useState();
  const [email, setEmail]: any = useState();

  const listDocuments = (email: string) => {
    const promise = databases.listDocuments(
      "64748082e458885cc1dd",
      "64748089ef99c41ad0b2"
    );
    promise.then(
      (res) => {
        setDocuments(
          res.documents.filter(
            (v: any) => v.file[3] === "Yes" && v.file[4] === email
          )
        );
        setLoading(false);
      },
      (err) => {
        console.log(err);
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    setLoading(true);
    const promise = account.get();

    promise.then(
      (res) => {
        listDocuments(res.email);
        setEmail(res.email);
      },
      (err) => {
        console.log(err);
        setLoading(false);
      }
    );
  }, []);

  useEffect(() => {
    setFiles([]);
    if (documents && documents.length > 0) {
      documents.forEach((item: any) => {
        setFiles((prev: any) => [
          ...prev,
          {
            name: item.file[1],
            id: item.file[0],
            imageURL: storage.getFilePreview(
              "64748172a5b0bd8409dd",
              item.file[0],
              28,
              28
            ).href,
            link: storage.getFileView("64748172a5b0bd8409dd", item.file[0])
              .href,
            isFavourite: item.file[3],
          },
        ]);
      });
    }
  }, [documents]);

  return (
    <>
      {loading && <Loading />}
      <div className="w-full h-full grid grid-rows-3 grid-cols-1 gap-y-5">
        <div className="w-full border border-solid border-[rgba(0,0,0,0.1)] rounded-lg bg-white box-border p-[15px]">
          <p className="text-sm text-[rgba(0,0,0,0.9)] font-semibold">
            Quick Access
          </p>
          {email && <QuickAccess email={email} />}
        </div>
        <div className="bg-white w-full rounded-[6px] border border-solid border-[rgba(0,0,0,0.1)] row-span-2 pt-[14px]">
          <div className="px-[14px] items-center w-full border-b border-solid border-[rgba(0,0,0,0.1)] flex gap-[6px] pb-[10px]">
            <p className="text-sm font-semibold text-[rgba(0,0,0,0.8)]">
              Favourite Files
            </p>
            <FontAwesomeIcon
              icon={faHeart}
              className="w-3 h-3 text-[rgba(0,0,0,0.8)]"
            />
          </div>
          <div
            id="favouriteFileView"
            className="w-full h-[37vh] overflow-y-scroll flex flex-col"
          >
            {files.map((item: any) => (
              <FileList inFavourite={"Yes"} item={item} key={item.id} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
