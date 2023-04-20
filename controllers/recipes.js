const express = require('express')
const router = express.Router()
const { Recipe } = require('../models')
const { User } = require('../models')

// Index All Recipes & Search Query
// https://www.mongodb.com/docs/manual/reference/operator/query/or/
// https://www.mongodb.com/docs/manual/reference/operator/query/regex/
// https://www.youtube.com/watch?v=DxjSG8jUGs8
// https://www.youtube.com/watch?v=O7VFp5fzZuE
// using $or and $regex mongodb query operators to allow the searchQuery to be more flexible with what users search
router.get('', async (req, res, next) => {
  try {
    // retrieves value of searchQuery and sets variable
    const searchQuery = req.query.search
    // if statement if there is a search query execute this block of code
    if (searchQuery) {
      recipes = await Recipe.find({
        // $or specifies multiple conditions, returning a recipe that has "searchQuery" in the name, ingredients, or the tags
        $or: [
          // { <field>: { $regex: /pattern/, $options: '<options>' } } *Mongodb Syntax*
          // field will be where we want to search in the document
          // $regex is is saying we want to use regular expression
          // searchQuery will be the pattern or parameters we want to pass through
          // $options i sets that we want to perform a case insensitive search
          { recipe_name: { $regex: searchQuery, $options: 'i' } },
          { ingredients: { $regex: searchQuery, $options: 'i' } },
          { tags: { $regex: searchQuery, $options: 'i' } }
        ]
      })
    } else {
      // if no searchQuery will render all recipes
      recipes = await Recipe.find({})
    }
    res.render('index.ejs', { recipes })
  } catch (err) {
    next()
  }
})

router.get('/cuisines', (req, res) => {
  res.render('cuisine.ejs')
})

router.get('/cuisine/:cuisine', async (req, res, next) => {
  try {
    let { cuisine } = req.params
    cuisine = cuisine[0].toUpperCase() + cuisine.substring(1, cuisine.length)
    // Help from Julio
    const recipes = await Recipe.find({ cuisine: `['${cuisine}']` })
    res.render('cuisineIndex.ejs', { recipes: recipes })
  } catch (err) {
    
    next()
  }
})

router.get('/holidays', async (req, res, next) => {
  try {
    const recipes = await Recipe.find({
      $or: [
        { recipe_name: { $regex: 'holiday', $options: 'i' } },
        { tags: { $regex: 'holiday', $options: 'i' } }
      ]
    })
    res.render('tags.ejs', { recipes: recipes })
  } catch (err) {
    next()
  }
})

router.get('/dessert', async (req, res, next) => {
  try {
    const recipes = await Recipe.find({
      $or: [
        { recipe_name: { $regex: 'dessert', $options: 'i' } },
        { tags: { $regex: 'dessert', $options: 'i' } }
      ]
    })
    res.render('tags.ejs', { recipes: recipes })
  } catch (err) {
    next()
  }
})

router.get('/smoothies', async (req, res, next) => {
  try {
    const recipes = await Recipe.find({
      $or: [
        { recipe_name: { $regex: 'smoothie', $options: 'i' } },
        { tags: { $regex: 'smoothie', $options: 'i' } }
      ]
    })
    res.render('tags.ejs', { recipes: recipes })
  } catch (err) {
    next()
  }
})

router.get('/snacks', async (req, res, next) => {
  try {
    const recipes = await Recipe.find({
      $or: [
        { recipe_name: { $regex: 'snack', $options: 'i' } },
        { tags: { $regex: 'snack', $options: 'i' } }
      ]
    })
    res.render('tags.ejs', { recipes: recipes })
  } catch (err) {
    next()
  }
})

//show route
router.get('/:id', async (req, res, next) => {
  try {
    const recipeSelected = await Recipe.findById(req.params.id)
    res.render('show.ejs', { recipe: recipeSelected })
  } catch (err) {
    next()
  }
})

//edit route
router.get('/:id/edit', async (req, res, next) => {
  try {
    const recipeToBeEdited = await Recipe.findById(req.params.id)
    res.render('edit.ejs', { recipe: recipeToBeEdited })
  } catch (err) {
    next()
  }
})

//update route
router.put('/:id', async (req, res, next) => {
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body
    )
    res.redirect(`/recipes/${req.params.id}`)
  } catch (err) {
    next()
  }
})

router.get('/:id/delete', async (req, res, next) => {
  try {
    const recipeToBeDeleted = await Recipe.findById(req.params.id)
    res.render('delete.ejs', { recipe: recipeToBeDeleted })
  } catch (err) {
    next()
  }
})

//delete route
router.delete('/:id', async (req, res) => {
  try {
    const deletedItem = await Recipe.findByIdAndDelete(req.params.id)
    res.redirect('/recipes')
  } catch (err) {
    next()
  }
})

module.exports = router
