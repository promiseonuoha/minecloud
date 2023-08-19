"use client";
import { usePathname } from "next/navigation";
import { databases } from "@/lib/appwriteConfig";
import { useState, useEffect } from "react";
import config from "@/config";

export default function FolderModal({ createFolder, canceled, email }: any) {
  const [folderName, setFolderName] = useState("");
  const [error, setError]: any = useState("");
  const invalidCharacters = "!@#$%^&*()";
  const [sibilings, setSiblings]: any = useState([]);
  const [opacity, setOpacity] = useState(0);
  const pathname = usePathname();

  const checkSiblings = () => {
    return sibilings.find((item: any) => item.folder[0] === folderName)
      ? false
      : true;
  };

  const handleCreateFolder = () => {
    let myString = "";
    if (folderName === "") {
      setError("Field Cannot be empty");
      return;
    }
    for (let character of invalidCharacters) {
      if (folderName.includes(character)) {
        setError("Invalid Character");
        return;
      }
    }
    if (!checkSiblings()) {
      setError("Folder already exist");
      return;
    }
    for (let character of ["contact", "favourite"]) {
      if (folderName === character) {
        setError(`Update the name ${folderName}`);
        return;
      }
    }
    for (let a of folderName) {
      if (a !== " ") {
        myString += a;
      }
    }
    createFolder(myString);
    setFolderName("");
  };

  useEffect(() => {
    setError("");
  }, [folderName]);

  useEffect(() => {
    setOpacity(1);
  }, []);

  useEffect(() => {
    const promise = databases.listDocuments(
      config.databaseId,
      config.collectionId
    );
    promise.then(
      (response) =>
        setSiblings(
          response.documents.filter(
            (item) => item.folder[1] === pathname && item.folder[2] === email
          )
        ),
      (err) => console.log(err)
    );
  }, [pathname, email]);

  return (
    <div className="w-full z-50 h-screen absolute top-0 left-0 flex justify-center items-center bg-black/10">
      <div
        style={{ opacity: opacity }}
        className="flex flex-col gap-2 duration-700 rounded bg-white w-[250px] p-3"
      >
        <p className="text-xs text-black/80 font-medium">Folder Name</p>
        <input
          type="text"
          placeholder="Folder Name"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          className="w-full py-2 outline-none pl-2 rounded bg-white border border-solid border-black/10 text-xs text-black/80"
        />
        {error !== "" && (
          <p style={{ color: "red" }} className="text-xs">
            {error}
          </p>
        )}
        <div className=" flex justify-between w-full items-center">
          <button
            onClick={() => {
              setFolderName("");
              canceled();
            }}
            className="w-fourtyEightPercent py-2.5 border border-solid hover:scale-105 border-black/10 text-black/80 text-xs rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleCreateFolder}
            className="w-fourtyEightPercent py-2.5 bg-blue-700 hover:scale-105 border-none text-white text-xs rounded"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
