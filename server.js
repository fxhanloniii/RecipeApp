// Imports
const express = require('express')
const app = express()
const PORT = 4000
// const methodOverride = require('method-override');
const recipesController = require('./controllers/recipes')
//added by SA for CRUD routes
const myRecipesController = require('./controllers/myRecipes')

// Middleware
app.set('view engine', 'ejs')

app.use(express.static('public'))

app.use(express.urlencoded({ extended: false }))

// app.use(methodOverride('_method'));

app.get('/', (req, res) => {
  res.render('home.ejs')
})

app.use('/recipes', recipesController)
//added by SA for CRUD routes
app.use('/myRecipes', myRecipesController)

// Server
app.listen(PORT, () => {
  console.log(`Cooking up recipes on ${PORT}`)
})
