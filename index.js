import express from 'express';
import recipesRouter from './routes/recipes.js';
import 'dotenv/config'



const app = express();
const port = 8003;
app.use(express.json());
app.use('/recipes', recipesRouter);

app.get('/', (req, res) => {
    res.send('GET request to the root')

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}) 