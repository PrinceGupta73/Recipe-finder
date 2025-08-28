export default function Sidebar({ open, onClose, onIngredientSelect }) {
  const vegOptions = ["Tomato", "Carrot", "Pumpkin", "Cheese"];
  const nonVegOptions = ["Chicken", "Beef", "Pork", "Salmon", "Tuna", "Shrimp"];

  return (
    <>
      {/* Mobile Overlay */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black bg-opacity-40 sm:hidden z-40"
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed sm:static top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50
        ${open ? "translate-x-0" : "-translate-x-full sm:translate-x-0"}`}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold text-blue-600">Ingredients</h2>
          <button
            onClick={onClose}
            className="sm:hidden text-gray-600 text-xl font-bold"
          >
            ✕
          </button>
        </div>

        {/* Vegetarian */}
        <div className="p-4">
          <h3 className="font-semibold mb-2 text-gray-700">Vegetarian</h3>
          <ul className="space-y-2">
            {vegOptions.map((item, idx) => (
              <li
                key={idx}
                onClick={() => {
                  onIngredientSelect(item.toLowerCase());
                  onClose();
                }}
                className="cursor-pointer px-3 py-2 rounded-md hover:bg-blue-100 transition"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Non-Vegetarian */}
        <div className="p-4">
          <h3 className="font-semibold mb-2 text-gray-700">Non-Vegetarian</h3>
          <ul className="space-y-2">
            {nonVegOptions.map((item, idx) => (
              <li
                key={idx}
                onClick={() => {
                  onIngredientSelect(item.toLowerCase());
                  onClose();
                }}
                className="cursor-pointer px-3 py-2 rounded-md hover:bg-blue-100 transition"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
