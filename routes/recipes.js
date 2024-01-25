import express from "express";
import { getRecipes, getRecipe } from "../controllers/recipesController.js";

const recipesRouter = express.Router();

recipesRouter.get("/", getRecipes);
recipesRouter.get("/:recipeId", getRecipe);

export default recipesRouter;
