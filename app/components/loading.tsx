import Image from "next/image";
import Spinner from "../../public/images/spinner.svg";

export default function Loading() {
  return (
    <main className="w-full h-screen flex justify-center absolute top-0 left-0 items-center bg-[rgba(0,0,0,0.1)]">
      <Image src={Spinner} alt="" height={60} width={60} />
    </main>
  );
}