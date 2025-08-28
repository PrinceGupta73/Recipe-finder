import { useState } from "react";
import { Search } from "lucide-react"; // search icon (optional, looks modern)

export default function SearchBar({ onSearch }) {
  const [input, setInput] = useState("");

  // Common ingredients (you can expand this list)
  const suggestions = [
    "chicken",
    "beef",
    "egg",
    "rice",
    "tomato",
    "potato",
    "milk",
    "cheese",
    "onion",
    "fish",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input);
      setInput("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center bg-white rounded-full shadow-lg overflow-hidden border border-gray-200 focus-within:ring-2 focus-within:ring-blue-400 transition"
    >
      {/* Search Icon */}
      <div className="pl-4 text-gray-400">
        <Search size={20} />
      </div>

      {/* Input with datalist */}
      <input
        list="ingredients"
        type="text"
        placeholder="Search recipes by ingredient..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-grow px-3 py-3 text-gray-700 focus:outline-none"
      />

      {/* Datalist suggestions */}
      <datalist id="ingredients">
        {suggestions.map((item, i) => (
          <option key={i} value={item} />
        ))}
      </datalist>

      {/* Button */}
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 font-semibold transition"
      >
        Search
      </button>
    </form>
  );
}
