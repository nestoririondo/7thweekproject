import express from 'express';
import recipesRouter from './routes/recipes.js';

const app = express();
const port = 3000;

app.use('/recipes', recipesRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// How to create a Node.js server with Express.js
// 1. npm init -y
// 2. npm install express
// 3. npm install nodemon --save-dev
// 4. package.json: "dev": "nodemon index.js"
// 5. package.json: "type": "module"
// 6. .env file
// 7. .gitignore: node_modules and .env
// 8. const router = express.Router();
