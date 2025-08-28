import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import RecipeList from "./components/RecipeList";
import RecipeModal from "./components/RecipeModal";
import "./index.css";

export default function App() {
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // 🔹 Load recipes + favorites from localStorage
  useEffect(() => {
    const storedRecipes = localStorage.getItem("recipes");
    const storedFavorites = localStorage.getItem("favorites");
    if (storedRecipes) setRecipes(JSON.parse(storedRecipes));
    if (storedFavorites) setFavorites(JSON.parse(storedFavorites));
  }, []);

  // 🔹 Save recipes to localStorage
  useEffect(() => {
    if (recipes.length > 0) {
      localStorage.setItem("recipes", JSON.stringify(recipes));
    }
  }, [recipes]);

  // 🔹 Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const fetchRecipes = async (ingredient) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
      );
      const data = await res.json();
      setRecipes(data.meals || []);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecipeDetails = async (id) => {
    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      const data = await res.json();
      setSelectedRecipe(data.meals[0]);
    } catch (error) {
      console.error("Error fetching recipe details:", error);
    }
  };

  // 🔹 Add / Remove Favorites
  const toggleFavorite = (recipe) => {
    if (favorites.find((fav) => fav.idMeal === recipe.idMeal)) {
      // remove
      setFavorites(favorites.filter((fav) => fav.idMeal !== recipe.idMeal));
    } else {
      // add
      setFavorites([...favorites, recipe]);
    }
  };

  const clearRecipes = () => {
    localStorage.removeItem("recipes");
    setRecipes([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300 text-gray-900">
      {/* Hero Section */}
      <section
        className="relative text-center py-16 bg-cover bg-center shadow-md"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1606788075761-20f1a9f9c720?auto=format&fit=crop&w=1920&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/80 to-emerald-700/80"></div>

        <div className="relative z-10 px-4">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3 drop-shadow-lg">
            🍲 Recipe Finder
          </h1>
          <p className="text-lg sm:text-xl text-gray-100 mb-6">
            Find your favorite recipes by ingredients!
          </p>

          <div className="max-w-lg mx-auto">
            <SearchBar onSearch={(ing) => fetchRecipes(ing)} />
          </div>

          {recipes.length > 0 && (
            <button
              onClick={clearRecipes}
              className="mt-6 px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-md transition"
            >
              Clear Recipes
            </button>
          )}
        </div>
      </section>

      {/* Main Content */}
      <div className="p-6">
        {loading && (
          <div className="flex justify-center mt-6">
            <div className="w-10 h-10 border-4 border-blue-400 border-dashed rounded-full animate-spin"></div>
          </div>
        )}

        {/* Recipes List with Favorite toggle */}
        <RecipeList
          recipes={recipes}
          onRecipeClick={(r) => fetchRecipeDetails(r.idMeal)}
          onToggleFavorite={toggleFavorite}
          favorites={favorites}
        />

        {/* Favorite Section */}
        {favorites.length > 0 && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4">⭐ My Favorites</h2>
            <RecipeList
              recipes={favorites}
              onRecipeClick={(r) => fetchRecipeDetails(r.idMeal)}
              onToggleFavorite={toggleFavorite}
              favorites={favorites}
            />
          </div>
        )}

        {selectedRecipe && (
          <RecipeModal
            recipe={selectedRecipe}
            onClose={() => setSelectedRecipe(null)}
          />
        )}
      </div>
    </div>
  );
}
