'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder } from '@fortawesome/free-regular-svg-icons';
import { databases } from '../../lib/appwriteConfig';

export default function QuickAccess({ changed, email }: any) {
  const [allFolders, setAllFolders]: any = useState(null);

  const listFolders = () => {
    setAllFolders([]);
    const promise = databases.listDocuments('64748082e458885cc1dd', '64748089ef99c41ad0b2');
    promise.then(
      (response: any) =>
        setAllFolders(response.documents.filter((item: any) => item.folder[1] === '/' && item.folder[2] === email)),
      (err: any) => console.log(err),
    );
  };

  useEffect(() => {
    listFolders();
  }, [changed]);

  return (
    <>
      <div id="quickAccess" className="pt-[15px] flex gap-[14px] overflow-x-scroll h-[19vh]">
        {allFolders &&
          allFolders.map((item: any) => {
            return (
              <Link href={`/${item.folder[0]}`} key={item.folder[0]}>
                <div className="box-border w-[160px] p-[14px] rounded-[6px] border border-solid border-[rgba(0,0,0,0.1)]">
                  <FontAwesomeIcon icon={faFolder} className="w-4 h-4 text-blue-700" />
                  <p className="pt-[14px] text-xs font-semibold">
                    {item.folder[0].length !== 19 && item.folder[0]}
                    {item.folder[0].length >= 19 && item.folder[0].slice(0, 19) + '...'}
                  </p>
                </div>
              </Link>
            );
          })}
        {!allFolders || (allFolders.length === 0 && <p className="text-sm font-medium text-[rgba(0,0,0,0.7)]">No Folder</p>)}
      </div>
    </>
  );
}
