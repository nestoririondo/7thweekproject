import express from "express";
import { getRecipes, getRecipe, postRecipe } from "../controllers/recipesController.js";

const recipesRouter = express.Router();

recipesRouter.get("/", getRecipes);
recipesRouter.get("/:id", getRecipe);
recipesRouter.post("/new", postRecipe);

export default recipesRouter;
