import pool from "../db/pool.js";

export const checkRecipe = async (req, res, next) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "Recipe id required." });
  if (isNaN(id))
    return res.status(400).json({ message: "Recipe id must be a number." });
  try {
    const query = "SELECT * FROM recipes WHERE id=$1";
    const values = [id];
    const { rows } = await pool.query(query, values);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Recipe not found" });
    } else {
      next();
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
