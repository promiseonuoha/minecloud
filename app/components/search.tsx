"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { databases, storage } from "../appwrite/appwriteConfig";

export default function Search({ value, email }: any) {
  const [data, setData]: any = useState(null);
  const [filesData, setFilesData]: any = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const promise = databases.listDocuments(
      "64748082e458885cc1dd",
      "64748089ef99c41ad0b2"
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
          }
        });
        setLoading(false);
      }, 500);
    }
  }, [value, data]);

  return (
    <div className="absolute top-[40px] bg-white rounded w-[300px] h-auto max-h-[140px] overflow-y-scroll p-2 right-[-50px] border border-solid border-[rgba(0,0,0,0.1)]">
      {!loading && (
        <div>
          <p className="text-[13px] font-medium text-[rgba(0,0,0,0.8)] text-center">
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
                  className="w-full px-2 flex gap-2 cursor-pointer items-center py-[6px] duration-100 hover:bg-[rgba(185,175,175,0.1)]"
                >
                  <Image
                    src={v.imageURL}
                    loader={imageLoader}
                    alt="File Image"
                    width={20}
                    height={20}
                    className="rounded-[50%]"
                  />
                  <p className="w-full overflow-x-hidden overflow-y-hidden h-5 self-center text-[13px] text-[rgba(0,0,0,0.8)]">
                    {v.name}
                  </p>
                </div>
              );
            })}
          {value.length >= 2 && filesData.length < 1 && (
            <p className="text-xs text-[rgba(0,0,0,0.8)]">No File Found</p>
          )}
        </div>
      )}
      {loading && (
        <div className="w-full h-[20px] flex justify-center items-center">
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
