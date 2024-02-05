import express from "express";
import { getRecipes, getRecipe } from "../controllers/recipes.js";
import { checkRecipe } from '../middlewares/recipes.js'

const recipesRouter = express.Router();

recipesRouter.get("/", getRecipes);
recipesRouter.get("/:id", checkRecipe, getRecipe);

export default recipesRouter;
