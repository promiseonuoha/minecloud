"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import config from "@/config";
import { databases, storage } from "@/lib/appwriteConfig";

export default function Search({ value, email }: any) {
  const [data, setData]: any = useState(null);
  const [filesData, setFilesData]: any = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const promise = databases.listDocuments(
      config.databaseId,
      config.collectionId
    );

    promise.then(
      (res) =>
        setData(
          res.documents.filter((item) => {
            return item.file[4] === email;
          })
        ),
      (err) => console.log(err)
    );
  }, [email]);

  useEffect(() => {
    if (data && value.length >= 2) {
      setLoading(true);

      setTimeout(() => {
        setFilesData([]);
        data.forEach((item: any) => {
          if (item.file[1].toLowerCase().includes(value.toLowerCase())) {
            setFilesData((prev: any) => [
              ...prev,
              {
                name: item.file[1],
                id: item.file[0],
                imageURL: storage.getFilePreview(
                  config.bucketId,
                  item.file[0],
                  28,
                  28
                ).href,
                link: storage.getFileView(config.bucketId, item.file[0]).href,
                isFavourite: item.file[3],
              },
            ]);
          }
        });
        setLoading(false);
      }, 500);
    }
  }, [value, data]);

  return (
    <div className="absolute top-10 bg-white rounded w-[300px] h-auto max-h-[140px] overflow-y-scroll p-2 right-[-50px] border border-solid border-black/10">
      {!loading && (
        <div>
          <p className="text-[13px] font-medium text-black/80 text-center">
            Search Results
          </p>
          {value.length >= 2 &&
            filesData.length > 0 &&
            filesData.map((v: any) => {
              const imageLoader = () => {
                return `${v.imageURL}`;
              };
              return (
                <div
                  onClick={() => window.open(v.link)}
                  key={v.id}
                  className="w-full px-2 flex gap-2 cursor-pointer items-center py-1.5 duration-100 hover:bg-primarySlate100"
                >
                  <Image
                    src={v.imageURL}
                    loader={imageLoader}
                    alt="File Image"
                    width={20}
                    height={20}
                    className="rounded-[50%]"
                  />
                  <p className="w-full overflow-x-hidden overflow-y-hidden h-5 self-center text-[13px] text-black/80">
                    {v.name}
                  </p>
                </div>
              );
            })}
          {value.length >= 2 && filesData.length < 1 && (
            <p className="text-xs text-black/80">No File Found</p>
          )}
        </div>
      )}
      {loading && (
        <div className="w-full h-5 flex justify-center items-center">
          <Image
            src="/images/spinner.svg"
            alt="Loading..."
            width={20}
            height={20}
          />
        </div>
      )}
    </div>
  );
}
