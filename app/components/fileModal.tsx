'use client';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faFile } from '@fortawesome/free-regular-svg-icons';
import { storage } from '@/lib/appwriteConfig';

export default function FileModal({ choosedFile, choosedFolder, loading, stopLoading }: any) {
  const [bg, setBg] = useState('transparent');
  const [opacity, setOpacity] = useState(0);
  const [transform, setTransform] = useState('translateY(30px)');
  const handleFile = (e: any) => {
    loading();
    const promise = storage.createFile('64748172a5b0bd8409dd', crypto.randomUUID(), e.target.files[0]);
    promise.then(
      (res) => {
        choosedFile(res.$id, res.name);
      },
      () => stopLoading(),
    );
  };

  useEffect(() => {
    setOpacity(1);
    setTransform('translateY(0px)');
  }, []);

  return (
    <div
      style={{ opacity: opacity, transform: transform }}
      className="absolute duration-700 top-10 z-40 shadow-[0px_0px_1px_rgba(0,0,0,0.1)] bg-white rounded right-0 flex flex-col gap-1 w-[160px] border border-solid border-[rgba(0,0,0,0.1)]"
    >
      <div className="relative">
        <button
          style={{ backgroundColor: bg }}
          className="w-full pl-3 pr-4 flex items-center justify-between font-semibold text-left py-2  text-xs text-[rgba(0,0,0,0.8)]"
        >
          File
          <FontAwesomeIcon icon={faFile} className="w-3 h-3 text-[rgba(0,0,0,0.8)]" />
        </button>
        <input
          onChange={handleFile}
          type="file"
          onMouseOver={() => setBg('rgba(0,0,0,0.1)')}
          onMouseOut={() => setBg('transparent')}
          className="absolute top-0 left-0 w-full py-[6px]  opacity-0 -translate-y-[6px]"
        />
      </div>
      <button
        onClick={choosedFolder}
        className="w-full flex items-center pr-4 justify-between pl-3 text-left font-semibold py-2 cursor-default hover:bg-[rgba(0,0,0,0.1)] text-xs text-[rgba(0,0,0,0.8)]"
      >
        Folder
        <FontAwesomeIcon icon={faFolder} className="w-3 h-3 text-[rgba(0,0,0,0.8)]" />
      </button>
    </div>
  );
}
