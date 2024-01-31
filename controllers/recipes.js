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
    console.log(`Sent recipes: ${rows.length}`);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving recipes" });
  }
};

export const searchRecipes = async (req, res) => {
  const { q = "" } = req.query;
  console.log(req.query);
  console.log(`GET ${q}`);
  try {
    const text = `
    SELECT r.*
    FROM recipes r
    INNER JOIN recipe_keywords rk ON r.id = rk.recipe_id
    INNER JOIN keywords k ON rk.keyword_id = k.id
    WHERE k.keyword LIKE $1
    GROUP BY r.id
  `;
    const values = [`%${q}%`];
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
    let query = `
    SELECT r.name, r.instructions, r.preparation_time, r.difficulty
    FROM recipes r
    WHERE r.id = $1`;
    const value = [id];
    let response1  = await pool.query(query, value);
    console.log(response1.rows[0]);

    let query2 = `
    SELECT i.name as ingredient_name, ri.amount
    FROM ingredients i
    JOIN recipe_ingredients ri ON i.id = ri.ingredient_id
    JOIN recipes r ON r.id = ri.recipe_id
    WHERE r.id = $1`;
    const response2 = await pool.query(query2, value);
    console.log(response2.rows);
    response1.rows[0].ingredients = response2.rows;

    res.json(response1.rows[0]);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving recipe" });
  }
};

// export const voteRecipe = async (req, res) => {
//   const { id, vote } = req.body;
//   try {
//     const text = "INSERT INTO votes (id, vote) VALUES ($1, $2)";
//     const value = [id, vote];
//     const { rows } = await pool.query(text, value);
//     res.status(200).json(rows[0]);
//   } catch (error) {
//     console.error(error);
//     res.status(500).son({ error: "An error occurred while voting the recipe" });
//   }
// };

// export const postRecipe = (req, res) => {
//   const { name, ingredients } = req.body;
//   console.log(`POST ${name}`);
//   const newRecipe = { id: recipes.length + 1, name, ingredients };
//   recipes.push(newRecipe);
//   res.status(201).json(newRecipe);
// };