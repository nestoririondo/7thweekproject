import express from 'express';
import { getRecipes , getRecipe , searchRecipes } from '../controllers/recipesController.js';

const recipesRouter = express.Router();

recipesRouter.get('/', getRecipes);
recipesRouter.get('/:id', getRecipe);
recipesRouter.get('/:search', searchRecipes);

export default recipesRouter;