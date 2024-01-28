import express from 'express';
import { getRecipes , getRecipe } from '../controllers/recipesController.js';

const recipesRouter = express.Router();

cookbookRouter.get('/', getRecipes);
cookbookRouter.get('/', getRecipe);



export default recipesRouter;

