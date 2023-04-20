const express = require('express')
const router = express.Router()
const UserRecipe = require('../models/userRecipe')

//new route
router.get('/new', (req, res) => {
  res.render('userRecipe/new.ejs')
})

//post route to post through mongo
router.post('', async (req, res, next) => {
  try {
    const newRecipe = req.body
    await UserRecipe.create(req.body)
    res.redirect('/userRecipe')
  } catch (err) {
    next()
  }
})

//this is the index page
router.get('', async (req, res, next) => {
  try {
    recipes = await UserRecipe.find({})
    res.render('userRecipe/nyindex.ejs', { recipes })
  } catch (err) {
    next()
  }
})

//show route
router.get('/:id', async (req, res, next) => {
  try {
    const recipeSelected = await UserRecipe.findById(req.params.id)
    res.render('userRecipe/nyshow.ejs', { recipe: recipeSelected })
  } catch (err) {
    next()
  }
})

//edit id route
router.get('/:id/edit', async (req, res, next) => {
  try {
    const recipeToBeEdited = await UserRecipe.findById(req.params.id)
    res.render('userRecipe/nyedit.ejs', { recipe: recipeToBeEdited })
  } catch (err) {
    next()
  }
})

// update route
router.put('/:id', async (req, res, next) => {
  try {
    const updatedRecipe = await UserRecipe.findByIdAndUpdate(
      req.params.id,
      req.body
    )
    res.redirect(`/userRecipe/${req.params.id}`)
  } catch (err) {
    next()
  }
})

// delete
router.get('/:id/delete', async (req, res, next) => {
  try {
    const recipeToBeDeleted = await UserRecipe.findById(req.params.id)
    res.render('userRecipe/nydelete.ejs', { recipe: recipeToBeDeleted })
  } catch (err) {
    next()
  }
})

// delete update page
router.delete('/:id', async (req, res) => {
  try {
    const deletedItem = await UserRecipe.findByIdAndDelete(req.params.id)
    res.redirect('/userRecipe')
  } catch (err) {
    next()
  }
})

module.exports = router
