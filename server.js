// Imports
const express = require('express')
const app = express()
const PORT = 4000
const methodOverride = require('method-override')
const recipesController = require('./controllers/recipes')

const userRecipeController = require('./controllers/userRecipe')
const userController = require('./controllers/users')

const session = require('express-session')
const MongoStore = require('connect-mongo')

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

app.use((req, res, next) => {
  const guest = [
      {href: '/login', title: 'login'},
      {href: '/signup', title: 'signup'}
  ];
  const loggedIn = [
      {href: '/userRecipe/new'},
      {href: '/recipes/recipe._id/edit'},
      {href: '/recipes/recipe._id/delete'},
      {href: '/logout'}
  ];
  let user;
  function isLoggedIn() {
      res.locals.username = req.session.currentUser.username;
      res.locals.routes = loggedIn;
  }
  function guestUser() {
      res.locals.routes = guest;
  }
  req.session.currentUser ? isLoggedIn() : guestUser();
  next();
})

app.use(express.urlencoded({ extended: false }))

app.use(methodOverride('_method'))

app.get('/', (req, res) => {
  res.render('home.ejs')
})

app.use('', userController)

app.use('/recipes', recipesController)

app.use('/userRecipe', userRecipeController)



// Server
app.listen(PORT, () => {
})
