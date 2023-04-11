const express = require('express')
const router = express.Router()
const { Recipe } = require('../models')

//new route (added by SA)
router.get('/new', (req, res) => {
  res.render('myRecipe/new.ejs')
})

//post route to post through mongo (added by SA)
router.post('', async (req, res, next) => {
  try {
    const newRecipe = await Recipe.create(req.body)
    console.log(newRecipe)
    res.redirect('/recipe')
  } catch (err) {
    console.log(err)
    next()
  }
})

//edit id route (added by SA)
router.get('/:id/edit', async (req, res, next) => {
  try {
    const recipeToBeEdited = await Recipe.findById(req.params.id)
    console.log(bookToBeEdited)
    res.render('recipes/edit.ejs', { recipe: recipeToBeEdited })
  } catch (err) {
    console.log(err)
    next()
  }
})

//(added by SA)
router.put('/:id', async (req, res, next) => {
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body
    )
    // console.log(updatedRecipe);
    res.redirect(`/recipes/${req.params.id}`)
  } catch (err) {
    console.log(err)
    next()
  }
})

// get route (added by SA)
router.get('/:id/delete', async (req, res, next) => {
  try {
    const recipeToBeDeleted = await Recipe.findById(req.params.id)
    // console.log(recipeToBeDeleted);
    res.render('recipe/delete.ejs', { recipe: recipeToBeDeleted })
  } catch (err) {
    console.log(err)
    next()
  }
})

//delete route (added by SA)
router.delete('/:id', async (req, res) => {
  try {
    const deletedItem = await Recipe.findByIdAndDelete(req.params.id)
    // console.log(deletedItem);
    res.redirect('/recipe')
  } catch (err) {
    console.log(err)
    next()
  }
})

module.exports = router
