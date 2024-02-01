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
        
        if (rows.length === 0) {
            res.status(404).json({error: 'Recipe not found'});
        } else {
            res.status(200).json(rows[0]);
        }
    } catch (err) {
        res.status(500).json({error: err});
    }
}

export const searchRecipes = async ({ query: { q = "" } }, res) => {
    console.log(`GET ${q}`);
    const query = `
        SELECT r.*
        FROM recipes r
        INNER JOIN recipe_keywords rk ON r.id = rk.recipe_id
        INNER JOIN keywords k ON rk.keyword_id = k.id
        WHERE k.keyword LIKE $1
        GROUP BY r.id
    `;
    try {
        const { rows } = await pool.query(query, [`%${q}%`]);
        console.log(`Sent recipes: ${rows.length}`);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while retrieving recipes" });
    }
};
