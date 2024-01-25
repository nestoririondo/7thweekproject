const recipes = [
  { id: 1, name: "Pizza", ingredients: ["dough", "tomato", "cheese"] },
  { id: 2, name: "Hamburger", ingredients: ["bun", "meat", "cheese"] },
  { id: 3, name: "Hot Dog", ingredients: ["bun", "sausage", "ketchup"] },
  { id: 4, name: "Lasagna", ingredients: ["pasta", "tomato", "cheese"] },
];

export const getRecipes = (req, res) => {
  res.json(recipes);
};

export const getRecipe = (req, res) => {
  const { recipeId } = req.params;
  console.log(req.params);
  const recipe = recipes.find((recipe) => recipe.id === Number(recipeId));
  res.json(recipe);
};
