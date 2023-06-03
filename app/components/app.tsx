"use client";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import FileModal from "./fileModal";
import QuickAccess from "./quickAccess";
import FolderModal from "./folderModal";
import FilesNavator from "./filesNavigator";
import {
  databases,
  storage,
  creatingFolder,
  addFile,
  deleteDocument,
  updateDocument,
  account,
} from "../appwrite/appwriteConfig";
import { usePathname } from "next/navigation";
import Loading from "./loading";
import FileList from "./fileList";
import FolderList from "./folderList";
import Signin from "./signIn";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn]: any = useState(true);
  const [userDetails, setUserDetails]: any = useState();
  const [fileDropDown, setFileDropDown] = useState(false);
  const [folderDropDown, setFolderDropDown] = useState(false);
  const [folders, setFolders]: any = useState(null);
  const [ids, setIds]: any = useState(null);
  const [files, setFiles]: any = useState([]);
  const [loading, setLoading] = useState(false);
  const [changed, setChanged]: any = useState(0);
  const pathname = usePathname();

  const listDocuments = () => {
    const promise = databases.listDocuments(
      "64748082e458885cc1dd",
      "64748089ef99c41ad0b2"
    );

    promise.then(
      (res) => {
        setFolders(
          res.documents.filter((item: any) => item.folder[1] === pathname)
        );
        setIds(
          res.documents.filter((v) => {
            return v.file[2] === pathname;
          })
        );
        setChanged(Math.random());
        setLoading(false);
      },
      (err) => {
        setChanged(Math.random());
        setLoading(false);
        console.log(err);
      }
    );
  };

  const deleteFile = (id: string) => {
    setLoading(true);
    const promise = storage.deleteFile("64748172a5b0bd8409dd", id);
    promise.then(
      () =>
        deleteDocument(id).then(
          () => listDocuments(),
          (err) => console.log(err)
        ),
      (err) => console.log(err)
    );
  };

  const deleteChildren = async (folder: any, file: any) => {
    for (const item of folder) {
      try {
        await databases.deleteDocument(
          "64748082e458885cc1dd",
          "64748089ef99c41ad0b2",
          item.$id
        );
      } catch {
        console.log("error");
      }
    }
    for (const item of file) {
      try {
        await storage.deleteFile("64748172a5b0bd8409dd", item.$id);
        await databases.deleteDocument(
          "64748082e458885cc1dd",
          "64748089ef99c41ad0b2",
          item.$id
        );
      } catch {
        console.log("error");
      }
    }
  };

  const deleteFolder = (path: string, id: string) => {
    setLoading(true);
    let folders: any;
    let files: any;
    const promise = databases.listDocuments(
      "64748082e458885cc1dd",
      "64748089ef99c41ad0b2"
    );

    promise
      .then(
        (res) => {
          folders = res.documents.filter(
            (item: any) =>
              item.folder.length && item.folder[1].indexOf(path) !== -1
          );
          files = res.documents.filter(
            (item: any) => item.file.length && item.file[2].indexOf(path) !== -1
          );
        },
        (err) => {
          console.log(err);
        }
      )
      .finally(() =>
        deleteChildren(folders, files).then(() => {
          databases
            .deleteDocument("64748082e458885cc1dd", "64748089ef99c41ad0b2", id)
            .then(
              () => {
                listDocuments();
                setLoading(false);
              },
              (err) => console.log(err)
            );
        })
      );
  };

  const clickedFavourite = (
    type: string,
    id: string,
    name: string,
    path: string
  ) => {
    setLoading(true);
    updateDocument(id, name, path, `${type === "No" ? "Yes" : "No"}`).then(
      () => listDocuments(),
      (err) => {
        console.log(err);
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    const getAccount = account.get();

    getAccount.then(
      (res) => {
        setIsLoggedIn(true);
        setLoading(true);
        listDocuments();
        setUserDetails(res);
        console.log(res);
      },
      (err) => {
        console.log(err);
        setIsLoggedIn(false);
      }
    );
  }, []);

  useEffect(() => {
    setFiles([]);
    if (ids) {
      ids.forEach((item: any) => {
        setFiles((prev: any) => [
          ...prev,
          {
            name: item.file[1],
            id: item.file[0],
            imageURL: storage.getFilePreview(
              "64748172a5b0bd8409dd",
              item.file[0]
            ).href,
            link: storage.getFileView("64748172a5b0bd8409dd", item.file[0])
              .href,
            isFavourite: item.file[3],
          },
        ]);
      });
    }
  }, [ids]);

  return (
    <>
      {folderDropDown && (
        <FolderModal
          createFolder={(name: string) => {
            setFolderDropDown(false);
            setLoading(true);
            creatingFolder(name, pathname).then(
              () => {
                setLoading(false);
                listDocuments();
                setChanged(Math.random());
              },
              () => setLoading(false)
            );
          }}
          canceled={() => setFolderDropDown(false)}
        />
      )}
      {loading && <Loading />}
      {isLoggedIn ? (
        <div className="w-full h-full grid grid-rows-3 grid-cols-1 gap-y-5">
          <div className="w-full border border-solid border-[rgba(0,0,0,0.1)] rounded-lg bg-white box-border p-[15px]">
            <p className="text-sm text-[rgba(0,0,0,0.9)] font-semibold">
              Quick Access
            </p>
            <QuickAccess changed={changed} />
          </div>
          <div className="bg-white w-full rounded-[6px] border border-solid border-[rgba(0,0,0,0.1)] row-span-2 pt-[14px]">
            <div className="">
              <div className="w-full px-[14px] flex justify-between items-center ">
                <FilesNavator />
                <div className="relative">
                  <button
                    onClick={() => setFileDropDown((prev) => !prev)}
                    className="flex justify-center items-center border-none rounded text-white text-xs px-8 py-[10px] bg-[rgb(29,78,216)] hover:bg-[rgba(29,78,216,0.8)] gap-1"
                  >
                    <FontAwesomeIcon
                      icon={faPlus}
                      className="w-3 h-3 text-white"
                    />
                    Add New
                  </button>
                  {fileDropDown && (
                    <FileModal
                      choosedFile={(id: string, name: string) => {
                        setFileDropDown(false);
                        addFile(id, name, pathname).then(
                          () => listDocuments(),
                          (err) => console.log(err)
                        );
                      }}
                      choosedFolder={() => {
                        setFileDropDown(false);
                        setFolderDropDown(true);
                      }}
                      loading={() => setLoading(true)}
                    />
                  )}
                </div>
              </div>
              <div className="pt-3 w-full flex pb-2 border-b border-solid border-[rgba(0,0,0,0.1)] px-[14px]">
                <p className="text-sm text-[rgba(0,0,0,0.6)]">Name</p>
              </div>
              <div
                id="fileView"
                className="w-full h-[37vh] overflow-y-scroll flex flex-col"
              >
                {folders &&
                  folders.map((item: any) => {
                    return (
                      <FolderList
                        key={item.folder[0]}
                        item={item}
                        trash={(path: string, id: string) =>
                          deleteFolder(path, id)
                        }
                      />
                    );
                  })}
                {files.map((item: any) => (
                  <FileList
                    item={item}
                    key={item.id}
                    trash={(id: string) => deleteFile(id)}
                    clickedFavourite={() =>
                      clickedFavourite(
                        item.isFavourite,
                        item.id,
                        item.name,
                        pathname
                      )
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Signin />
      )}
    </>
  );
}
