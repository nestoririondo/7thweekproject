import pool from "../db/pool.js";

export const getRecipes = async (req, res) => {
  const { skip = 0, limit = 100 } = req.query;
  try {
    const text = `
      SELECT *
      FROM recipes
      OFFSET $1 LIMIT $2
    `;
    const values = [skip, limit];
    const { rows } = await pool.query(text, values);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving recipes" });
  }
};

export const searchRecipes = async (req, res) => {
  const { keyword = "" } = req.query;
  console.log(req.query);
  console.log(`GET ${keyword}`);
  try {
    const text = `
    SELECT r.*
    FROM recipes r
    INNER JOIN recipe_keywords rk ON r.id = rk.recipe_id
    INNER JOIN keywords k ON rk.keyword_id = k.id
    WHERE k.keyword LIKE $1
    GROUP BY r.id
  `;
    const values = [`%${keyword}%`];
    const { rows } = await pool.query(text, values);
    console.log(`Sent recipes: ${rows.length}`);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving recipes" });
  }
};

export const getRecipe = async (req, res) => {
  const { id } = req.params;
  console.log(`GET ${id}`);
  try {
    const text = "SELECT * FROM recipes WHERE id = $1";
    const value = [id];
    const { rows } = await pool.query(text, value);
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving recipe" });
  }
};

export const postRecipe = (req, res) => {
  const { name, ingredients } = req.body;
  console.log(`POST ${name}`);
  const newRecipe = { id: recipes.length + 1, name, ingredients };
  recipes.push(newRecipe);
  res.status(201).json(newRecipe);
};
