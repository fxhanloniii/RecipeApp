const express = require('express')
const router = express.Router()
const { Recipe } = require('../models')

// router.get('/recipe', (req, res) => {
//     res.render('/index.ejs', { Recipe })
//   })
//http://localhost:4000/recipes
/* router.get('', async (req, res, next) => {
  try {
    const recipes = await Recipe.find({})
    res.render('index.ejs', { recipes })
  } catch (err) {
    next()
  }
}) */

router.get('', async (req, res, next) => {
    try {
      let recipes = [];
      const searchQuery = req.query.search;
      if (searchQuery) {
        recipes = await Recipe.find({
          $or: [
            { recipe_name: { $regex: searchQuery, $options: 'i' } },
            { ingredients: { $regex: searchQuery, $options: 'i' } },
            { tags: { $regex: searchQuery, $options: 'i' } }
          ]
        });
      } else {
        recipes = await Recipe.find({});
      }
      res.render('index.ejs', { recipes });
    } catch (err) {
      next();
    }
});
  

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
