let recipes = [
  {
    id: 1,
    name: "Pizza",
    ingredients: ["dough", "tomato", "cheese"],
    keywords: "italian, pizza, cheese",
  },
  {
    id: 2,
    name: "Hamburger",
    ingredients: ["bun", "meat", "cheese"],
    keywords: "american, hamburger, cheese",
  },
  {
    id: 3,
    name: "Hot Dog",
    ingredients: ["bun", "sausage", "ketchup"],
    keywords: "american, hot dog, ketchup",
  },
  {
    id: 4,
    name: "Lasagna",
    ingredients: ["pasta", "tomato", "cheese"],
    keywords: "italian, lasagna, cheese",
  },
  {
    id: 5,
    name: "Hot Salad",
    ingredients: ["lettuce", "croutons", "parmesan"],
    keywords: "italian, salad, cheese",
  },
];

export const getRecipes = (req, res) => {
  const searchTerm = req.query.search;
  console.log(`GET /recipes ${searchTerm ? `?search=${searchTerm}` : ""}`);
  if (!searchTerm) return res.send(recipes);
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.keywords.toLowerCase().includes(searchTerm.toLowerCase())
  );
  if (filteredRecipes.length === 0)
    return res
      .status(404)
      .json({ message: `No recipes found for ${searchTerm}` });
  res.send(filteredRecipes);
};

export const getRecipe = (req, res) => {
  const { id } = req.params;
  console.log(`GET ${id}`);
  const recipe = recipes.find((recipe) => recipe.id === Number(id));
  if (recipe) return res.json(recipe);
  res.status(200).json({ message: `No recipes found for ${searchTerm}` });
};

export const postRecipe = (req, res) => {
  const { name, ingredients } = req.body;
  console.log(`POST ${name}`);
  const newRecipe = { id: recipes.length + 1, name, ingredients };
  recipes.push(newRecipe);
  res.status(201).json(newRecipe);
};
