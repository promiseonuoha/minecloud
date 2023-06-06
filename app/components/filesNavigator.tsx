"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function FilesNavator() {
  const pathname = usePathname();
  return (
    <div
      id="filesNavigator"
      className="w-seventyPercent overflow-x-hidden max-[770px]:w-6/12"
    >
      <div className=" flex gap-1">
        <Link href={"/"} className="text-sm text-black/80">
          Home
        </Link>
        {pathname
          .split("/")
          .filter((x) => x !== "")
          .map((a) => (
            <Link href={`/${a}`} key={a} className="text-sm text-black/80">
              / {a}
            </Link>
          ))}
      </div>
    </div>
  );
}
