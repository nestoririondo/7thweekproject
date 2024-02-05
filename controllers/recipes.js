import pool from "../db/pool.js";

export const getRecipes = async (req, res) => {
  const { skip = 0, limit = 100, q = "" } = req.query;
  try {
    const text = `
      SELECT r.*
      FROM recipes r
      INNER JOIN recipe_keywords rk ON r.id = rk.recipe_id
      INNER JOIN keywords k ON rk.keyword_id = k.id
      WHERE k.keyword LIKE $1
      GROUP BY r.id
      ORDER BY r.date DESC
      OFFSET $2 LIMIT $3
    `;
    const values = [`%${q}%`, skip, limit];
    const { rows } = await pool.query(text, values);
    res.json(rows);
    console.log(`Sent recipes: ${rows.length}`);
  } catch (error) {
    res.sendStatus(500);
  }
};

export const getRecipe = async (req, res) => {
  const { id } = req.params;
  console.log(`GET ${id}`);
  try {
    const query = `
    SELECT i.name as ingredient_name, ri.amount
    FROM recipes r
    JOIN recipe_ingredients ri ON ri.recipe_id = r.id
    JOIN ingredients i ON i.id = ri.ingredient_id
    WHERE r.id = $1`;
    const value = [id];
    const { rows } = await pool.query(query, value);
    
    const ingredients = rows;
    const recipe = { ...req.recipe, ingredients };
    res.json(recipe);
  } catch (error) {
    res.sendStatus(500);
  }
};
