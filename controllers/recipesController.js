import pool from "../db.js";

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

export const getRecipes = async (req, res) => {
  const { search: searchTerm = '', skip = 0, limit = 100 } = req.query;
  console.log(`GET ${searchTerm}, ${skip}, ${limit}`);
  try {
    const text = 'SELECT * FROM recipes WHERE keywords LIKE $1 LIMIT $2 OFFSET $3';
    const values = [`%${searchTerm}%`, limit, skip];
    const results = await pool.query(text, values);
    res.json(results.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while retrieving recipes' });
  }
};

export const getRecipe = async (req, res) => {
  const { id } = req.params;
  console.log(`GET ${id}`);
  try {
    const text = 'SELECT * FROM recipes WHERE id = $1';
    const value = [id];
    const results = await pool.query(text, value);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while retrieving recipe' });
  }
};

export const postRecipe = (req, res) => {
  const { name, ingredients } = req.body;
  console.log(`POST ${name}`);
  const newRecipe = { id: recipes.length + 1, name, ingredients };
  recipes.push(newRecipe);
  res.status(201).json(newRecipe);
};
