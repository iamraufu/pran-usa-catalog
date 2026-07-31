export default function SearchBar({ search, setSearch }) {
  return (
    <input
      type="text"
      placeholder="Search products..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full border rounded-xl p-3 bg-white shadow-sm"
    />
  );
}