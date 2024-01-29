import express from 'express';
import recipesRouter from './routes/recipes.js';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(express.json()); // this is a middleware that parses the body of the request
app.use(cors()); // this is a middleware that allows requests from other origins
app.use(express.urlencoded({ extended: true })); // this is a middleware that parses the body of the request

app.use('/recipes', recipesRouter); // this links the recipesRouter to the /recipes path. it is a middleware

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})

// How to create a Node.js server with Express.js
// 1. npm init -y
// 2. npm install express
// 3. npm install nodemon --save-dev
// 4. package.json: "dev": "nodemon index.js"
// 5. package.json: "type": "module"
// 6. .env file
// 7. .gitignore: node_modules and .env
// 8. npm install cors
// 9. npm install dotenv
