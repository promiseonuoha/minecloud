"use client";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import FileModal from "./fileModal";
import QuickAccess from "./quickAccess";
import FolderModal from "./folderModal";
import FilesNavator from "./filesNavigator";
import config from "@/config";
import { usePathname } from "next/navigation";
import Loading from "./loading";
import FileList from "./fileList";
import FolderList from "./folderList";
import {
  databases,
  storage,
  deleteDocument,
  updateDocument,
  account,
  creatingFolder,
  addFile,
  deleteBucketFile,
} from "@/lib/appwriteConfig";

export default function Home() {
  const [fileDropDown, setFileDropDown] = useState(false);
  const [folderDropDown, setFolderDropDown] = useState(false);
  const [folders, setFolders]: any = useState(null);
  const [ids, setIds]: any = useState(null);
  const [files, setFiles]: any = useState([]);
  const [loading, setLoading] = useState(false);
  const [changed, setChanged]: any = useState(0);
  const [userDetails, setUserDetails]: any = useState();
  const pathname = usePathname();

  const listDocuments = (email: string) => {
    const promise = databases.listDocuments(
      config.databaseId,
      config.collectionId
    );
    promise.then(
      (res) => {
        setFolders(
          res.documents.filter((item: any) => {
            return item.folder[1] === pathname && item.folder[2] === email;
          })
        );
        setIds(
          res.documents.filter((v) => {
            return v.file[2] === pathname && v.file[4] === email;
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

  const deleteFile = async (id: string) => {
    try {
      await deleteBucketFile(id);
      await deleteDocument(id);
      listDocuments(userDetails.email);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteChildren = async (folder: any, file: any) => {
    for (const item of folder) {
      try {
        await deleteDocument(item.$id);
      } catch {
        console.log("error");
      }
    }
    for (const item of file) {
      try {
        await storage.deleteFile(config.bucketId, item.$id);
        await deleteDocument(item.$id);
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
      config.databaseId,
      config.collectionId
    );

    promise
      .then(
        (res) => {
          folders = res.documents.filter(
            (item: any) =>
              item.folder.length &&
              item.folder[2] === userDetails.email &&
              item.folder[1].indexOf(path) !== -1
          );
          files = res.documents.filter(
            (item: any) =>
              item.file.length &&
              item.file[4] === userDetails.email &&
              item.file[2].indexOf(path) !== -1
          );
        },
        (err) => {
          console.log(err);
        }
      )
      .finally(() =>
        deleteChildren(folders, files).then(() => {
          deleteDocument(id).then(
            () => {
              listDocuments(userDetails.email);
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
    updateDocument(
      id,
      name,
      path,
      `${type === "No" ? "Yes" : "No"}`,
      userDetails.email
    ).then(
      () => listDocuments(userDetails.email),
      (err: any) => {
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
        setUserDetails(res);
        listDocuments(res.email);
      },
      (err) => {
        console.log(err);
        setLoading(false);
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
              config.bucketId,
              item.file[0],
              28,
              28
            ).href,
            link: storage.getFileView(config.bucketId, item.file[0]).href,
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
            creatingFolder(name, pathname, userDetails.email).then(
              () => {
                setLoading(false);
                listDocuments(userDetails.email);
                setChanged(Math.random());
              },
              () => setLoading(false)
            );
          }}
          canceled={() => setFolderDropDown(false)}
          email={userDetails.email}
        />
      )}
      {loading && <Loading />}

      <div className="w-full h-full grid grid-rows-3 grid-cols-1 gap-y-5">
        {userDetails && (
          <div className="w-full border border-solid border-black/10 rounded-lg bg-white box-border p-4">
            <p className="text-sm text-black/90 font-semibold">Quick Access</p>

            <QuickAccess changed={changed} email={userDetails.email} />
          </div>
        )}
        {userDetails && (
          <div className="bg-white w-full rounded-md border border-solid border-black/10 row-span-2 pt-3.5">
            <div className="">
              <div className="w-full px-3.5 flex justify-between items-center ">
                <FilesNavator />
                <div className="relative">
                  <button
                    onClick={() => setFileDropDown((prev) => !prev)}
                    className="flex justify-center items-center border-none rounded text-white text-xs px-8 py-2.5 bg-blue-700 hover:bg-blue-700/80 gap-1"
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
                        addFile(id, name, pathname, userDetails.email).then(
                          () => listDocuments(userDetails.email),
                          (err) => console.log(err)
                        );
                      }}
                      choosedFolder={() => {
                        setFileDropDown(false);
                        setFolderDropDown(true);
                      }}
                      loading={() => setLoading(true)}
                      stopLoading={() => {
                        setLoading(false);
                        alert("Error Adding File");
                      }}
                    />
                  )}
                </div>
              </div>
              <div className="pt-3 w-full flex pb-2 border-b border-solid border-black/10 px-3.5">
                <p className="text-sm text-black/60">Name</p>
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
        )}
      </div>
    </>
  );
}
