import Image from "next/image";
import Spinner from "../../public/images/spinner.svg";

export default function Loading() {
  return (
    <main className="w-full h-screen flex z-50 justify-center absolute top-0 left-0 items-center bg-black/10">
      <Image src={Spinner} alt="" height={60} width={60} />
    </main>
  );
}
