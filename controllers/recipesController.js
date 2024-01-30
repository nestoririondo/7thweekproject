import pool from '../db/pool.js';

export const getRecipes = async (req, res) => {
    try {
        const page = req.query.page || 1; // get the page number from the query parameters, default to 1 if not provided
        const limit = 4; // number of recipes per page
        const offset = (page - 1) * limit; // calculate the offset

        const {rows} = await pool.query('SELECT * FROM recipes LIMIT $1 OFFSET $2', [limit, offset]);
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({error: err});
    }
}

export const getRecipe = async (req, res) => {
    try {
        const id = req.params.id; // assuming the id is passed as a URL parameter
        const {rows} = await pool.query('SELECT * FROM recipes WHERE id = $1', [id]);
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({error: err});
    }
}

export const getRecipesByIngredient = async (req, res) => {
    try {
        const ingredient = req.params.ingredient; // assuming the ingredient is passed as a URL parameter
        const page = req.query.page || 1; // get the page number from the query parameters, default to 1 if not provided
        const limit = 4; // number of recipes per page
        const offset = (page - 1) * limit; // calculate the offset

        const {rows} = await pool.query("SELECT * FROM recipes WHERE ingredients LIKE $1 LIMIT $2 OFFSET $3", [`%${ingredient}%`, limit, offset]);
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({error: err});
    }
}

export const updateRecipe = async (req, res) => {
    try {
        const id = req.params.id; // assuming the id is passed as a URL parameter
        const recipe = req.body; // assuming the updated recipe data is passed in the request body

        // update the recipe in the database
        const {rows} = await pool.query('UPDATE recipes SET name = $1, ingredients = $2, preparation_time = $3 WHERE id = $4 RETURNING *', [recipe.name, recipe.ingredients, recipe.preparation_time, id]);

        res.status(200).json(rows[0]);
    } catch (err) {
        res.status(500).json({error: err});
    }
}

export const getRecipesByPreparationTimeRange = async (req, res) => {
    try {
        const {rows} = await pool.query("SELECT * FROM recipes WHERE preparation_time BETWEEN $1 AND $2", [15, 45]); // assuming the preparation time range is passed as query parameters
        res.status(200).json(rows); // return the recipes
    } catch (err) {
        res.status(500).json({error: err});
    }
}