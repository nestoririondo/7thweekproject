import express from 'express';
import { getRecipes , getRecipe , updateRecipe , getRecipesByIngredient , getRecipesByPreparationTimeRange } from '../controllers/recipesController.js';

const recipesRouter = express.Router();

recipesRouter.get('/', getRecipes);
recipesRouter.get('/', getRecipe);
recipesRouter.get('/', updateRecipe);
recipesRouter.get('/', getRecipesByIngredient);
recipesRouter.get('/', getRecipesByPreparationTimeRange);



export default recipesRouter;