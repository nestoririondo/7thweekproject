import pool from '../db/pool.js'

export const checkRecipe = async (req, res, next) => {
  const { id } = req.params;
  if (!id) res.status(400).json("Recipe id required.");
  if (isNaN(id)) res.status(400).json("Recipe id must be a number.");
  try {
    const text = "SELECT * FROM recipes WHERE id=$1";
    const values = [id];
    const { rows } = await pool.query(text, values);
    rows.length === 0 ? res.status(404).json("Recipe not found") : next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
