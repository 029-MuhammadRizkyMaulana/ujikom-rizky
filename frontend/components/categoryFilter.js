export default function CategoryFilter({ categories, selectedCategory, setSelectedCategory }) {
  return (
    <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setSelectedCategory(cat)}
          className={`px-5 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap border ${
            selectedCategory === cat
              ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-200"
              : "bg-white border-gray-200 text-gray-600 hover:border-blue-400 hover:text-blue-500"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}