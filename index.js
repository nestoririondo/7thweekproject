import express from 'express';
import recipesRouter from './routes/recipes.js';  // import the recipesRouter



const app = express();
const port = 8003;

app.use('/recipes', recipesRouter);  // use the recipesRouter (which is imported from routes/recipes.js and contains all the routes for /recipes)

app.get('/', (req, res) => {
    res.send('GET request to the root')

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}) 