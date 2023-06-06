export default function Label({ element, title }: any) {
  return (
    <label htmlFor={element} className="text-black/80 text-xs font-medium pb-1">
      {title}
    </label>
  );
}
