import type { Recipe } from "~/interfaces/recipe.interface";

export const useRecipes = () => {
  const recipes = useState<Recipe[]>("recipes", () => []);

  const getRecipesFor = (id: string) => {
    return recipes.value.filter((recipe) => recipe.result === id);
  };

  const getUsages = (id: string) => {
    return recipes.value.filter((recipe) => recipe.ingredients.includes(id));
  };

  return { recipes, getRecipesFor, getUsages };
};
