export default function CategorySidebar({
  categories,
  selected,
  setSelected,
}) {
  return (
    <div className="sticky top-20">
      <div className="bg-white rounded-xl shadow p-4">
        <h3 className="font-bold mb-4">Categories</h3>

        <button
          onClick={() => setSelected("All")}
          className={`w-full text-left p-2 rounded mb-2 ${
            selected === "All"
              ? "bg-blue-600 text-white"
              : "hover:bg-gray-100"
          }`}
        >
          All Products
        </button>

        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelected(cat)}
            className={`w-full text-left p-2 rounded mb-2 ${
              selected === cat
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}