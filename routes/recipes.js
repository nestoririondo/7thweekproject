import express from "express";
import { getRecipes, searchRecipes, getRecipe, getImage } from "../controllers/recipes.js";
import { checkRecipe } from '../middlewares/recipes.js'

const recipesRouter = express.Router();

recipesRouter.get("/", getRecipes);
recipesRouter.get("/search", searchRecipes);
recipesRouter.get("/:id", checkRecipe, getRecipe);
// recipesRouter.post("/new", postRecipe);
// recipesRouter.post('/vote', voteRecipe);

export default recipesRouter;
