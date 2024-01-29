import pool from '../db/pool.js';

export const getRecipes = async (req, res) => {
    try {
        const {rows} = await pool.query('SELECT * FROM recipes');
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({error: err});
    }
}

export const getRecipe = async (req, res) => {
    try {
        const {rows} = await pool.query('SELECT * FROM recipes WHERE id = $1', [id]);
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({error: err});
    }
}