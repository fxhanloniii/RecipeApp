// Imports
const express = require('express')
const app = express()
const PORT = 4000
const methodOverride = require('method-override');
const recipesController = require('./controllers/recipes')
//added by SA for CRUD routes
const userRecipeController = require('./controllers/userRecipe')
const userController = require('./controllers/users')

const session = require('express-session');
const MongoStore = require('connect-mongo');

// Middleware
app.set('view engine', 'ejs')

app.use(express.static('public'))

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_DB_URI
    }),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7
    }
  })
)



app.use(express.urlencoded({ extended: false }))

app.use(methodOverride('_method'));

app.get('/', (req, res) => {
  res.render('home.ejs')
})

app.use('', userController);

app.use('/recipes', recipesController)
//added by SA for CRUD routes
app.use('/userRecipe', userRecipeController)

// Server
app.listen(PORT, () => {
  console.log(`Cooking up recipes on ${PORT}`)
})
