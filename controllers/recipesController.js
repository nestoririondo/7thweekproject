let recipes = [
    {
        id: 1,
        name: 'Pasta',
        ingredients: ['pasta', 'tomato sauce', 'meatballs'],
        directions: 'Boil pasta, add sauce, add meatballs',
        cookTime: 20,
        servings: 4
    },
    {
        id: 2,
        name: 'Pizza',
        ingredients: ['dough', 'tomato sauce', 'cheese', 'pepperoni'],
        directions: 'Roll dough, add sauce, add cheese, add pepperoni, bake',
        cookTime: 30,
        servings: 8
    },
    {
        id: 3,
        name: 'Salad',
        ingredients: ['lettuce', 'tomatoes', 'cucumbers', 'dressing'],
        directions: 'Chop lettuce, chop tomatoes, chop cucumbers, add dressing',
        cookTime: 10,
        servings: 2
    }
]

export const getCookbook = (req, res) => {
    res.json(cookbook)
    
}

const {id} = req.params;
console.log(id)