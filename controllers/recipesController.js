let recipes = [
  { id: 1, name: "Pizza", ingredients: ["dough", "tomato", "cheese"] },
  { id: 2, name: "Hamburger", ingredients: ["bun", "meat", "cheese"] },
  { id: 3, name: "Hot Dog", ingredients: ["bun", "sausage", "ketchup"] },
  { id: 4, name: "Lasagna", ingredients: ["pasta", "tomato", "cheese"] },
];

export const getRecipes = (req, res) => {
  res.json(recipes);
  console.log(`GET /recipes`);
  console.log(recipes);
};

export const getRecipe = (req, res) => {
  const { id } = req.params;
  console.log(`GET ${req.params.id}`);
  const recipe = recipes.find((recipe) => recipe.id === Number(id));
  if (recipe) {
    res.json(recipe);
  } else {
    res.status(404).json({ message: `Recipe with ID ${id} not found` });
  }
};

export const postRecipe = (req, res) => {
  let { name, ingredients } = req.body;
  console.log(`POST ${name}`);
  const newRecipe = { id: recipes.length + 1, name, ingredients };
  recipes.push(newRecipe);
  res.json(newRecipe);
};
