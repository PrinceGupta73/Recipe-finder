export default function RecipeCard({ recipe, type, onClick }) {
  const borderColor = type === "veg" ? "border-green-400" : "border-red-400";

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer overflow-hidden rounded-lg shadow-md transform transition duration-200 hover:scale-105 border-4 ${borderColor} bg-gradient-to-br from-white to-gray-50`}
    >
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{recipe.strMeal}</h3>
      </div>
    </div>
  );
}
