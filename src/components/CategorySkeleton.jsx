export default function CategorySkeleton() {
  return (
    <div
      className="
      w-full
      bg-gray-100
      px-3
      sm:px-6
      lg:px-8
      py-3
      flex
      gap-3
      overflow-hidden
      "
    >
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="
          h-11
          w-28
          rounded-xl
          bg-gray-200
          animate-pulse
          flex-shrink-0
          "
        />
      ))}
    </div>
  );
}
