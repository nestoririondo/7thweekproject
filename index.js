import express from 'express';
import recipesRouter from './routes/recipes';


const app = express();
const port = 3000;

app.use('/recipes', cookbook)

app.get('/', (req, res) => {
    res.send('GET request to the root')

})

//app.post('/', (req, res) => {
    //res.send('POST request to the root')
//})

//app.put('/', (req, res) => {
    //res.send('PUT request to the root')
//})

//app.delete('/', (req, res) => {
    //res.send('DELETE request to the root')
//})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})