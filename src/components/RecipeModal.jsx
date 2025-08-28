export default function RecipeModal({ recipe, onClose }) {
  if (!recipe) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4">
      <div className="bg-white text-black rounded-md p-6 w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-lg font-bold text-gray-600 hover:text-black"
        >
          ✕
        </button>
        <h2 className="text-2xl font-bold mb-4">{recipe.strMeal}</h2>
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="rounded-md mb-4"
        />
        <p className="mb-2">
          <span className="font-semibold">Category:</span> {recipe.strCategory}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Area:</span> {recipe.strArea}
        </p>
        <p className="text-sm text-gray-700">{recipe.strInstructions.slice(0, 200)}...</p>
      </div>
    </div>
  );
}
