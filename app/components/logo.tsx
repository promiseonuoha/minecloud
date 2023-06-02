export default function Logo() {
  return (
    <div className="w-5 h-5 relative translate-y-[3px]">
      <div
        style={{ clipPath: "polygon(33% 11%, 100% 0, 69% 93%, 1% 100%)" }}
        className="w-[45%] h-[60%] absolute top-[9%] left-[-1%] bg-blue-700 rotate-6"
      ></div>
      <div
        style={{ clipPath: "polygon(50% 7%, 100% 50%, 49% 92%, 0% 50%)" }}
        className="absolute top-0 left-[42.5%] w-[40%] h-[37%] bg-blue-700 rotate-[30deg] origin-left"
      ></div>
      <div
        style={{ clipPath: "polygon(33% 11%, 100% 0, 69% 93%, 1% 100%)" }}
        className="absolute right-[-2%] bottom-[10%] w-[45%] h-[60%] bg-blue-700 rotate-6"
      ></div>
    </div>
  );
}
