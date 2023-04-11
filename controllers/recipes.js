const express = require('express')
const router = express.Router()
const { Recipe } = require('../models')

// router.get('/recipe', (req, res) => {
//     res.render('/index.ejs', { Recipe })
//   })


// router.get('/recipe/new', (req, res) => {
//     res.render('/new.ejs')
// })


router.get('/cuisine/:cuisine', async (req, res, next) => {
  try {
    // console.log(req.params);
    let { cuisine } = req.params
    cuisine = cuisine[0].toUpperCase() + cuisine.substring(1, cuisine.length)
    // cuisine = cuisine.replaceAll
    // console.log(cuisine);
    // const recipes = await Recipe.find({ 'cuisine': {$regex:/cuisine/i} });
    const recipes = await Recipe.find({ cuisine: `['${cuisine}']` })
    //const recipes = await Recipe.find
    // console.log(recipes);
    res.render('cuisine.ejs', { recipes: recipes })
  } catch (err) {
    console.log(err)
    next()
  }
})

//show route
router.get('/:id', async (req, res, next) => {
  try {
    console.log(req.params)
    const recipeSelected = await Recipe.findById(req.params.id)
    console.log(recipeSelected)
    res.render('show.ejs', { recipe: recipeSelected })
  } catch (err) {
    next()
  }
})

module.exports = router
