import express from 'express';
import recipesRouter from './routes/recipes';


const app = express();
const port = 3000;

app.use('/recipes', cookbook)

app.get('/', (req, res) => {
    res.send('GET request to the root')

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})