export default function RecipeList({ recipes, onRecipeClick, onToggleFavorite, favorites }) {
  if (!recipes || recipes.length === 0) {
    return <p className="text-center text-gray-500">No recipes found. Try searching!</p>;
  }

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {recipes.map((recipe) => {
        const isFav = favorites?.some((fav) => fav.idMeal === recipe.idMeal);
        return (
          <div
            key={recipe.idMeal}
            className="bg-white rounded-lg shadow-md overflow-hidden relative group"
          >
            <img
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{recipe.strMeal}</h3>
              <div className="flex justify-between items-center mt-2">
                <button
                  onClick={() => onRecipeClick(recipe)}
                  className="text-blue-500 hover:underline"
                >
                  View
                </button>
                <button
                  onClick={() => onToggleFavorite(recipe)}
                  className={`px-2 py-1 rounded ${
                    isFav ? "bg-yellow-400 text-white" : "bg-gray-200"
                  }`}
                >
                  {isFav ? "★ Fav" : "☆ Fav"}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
