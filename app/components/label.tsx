export default function Label({ element, title }: any) {
  return (
    <label
      htmlFor={element}
      className="text-[rgba(0,0,0,0.8)] text-xs font-medium pb-1"
    >
      {title}
    </label>
  );
}
