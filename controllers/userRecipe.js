const express = require('express')
const router = express.Router()
const UserRecipe = require('../models/userRecipe')

//new route 
// http://localhost:4000/userRecipe/new
router.get('/new', (req, res) => {
  res.render('userRecipe/new.ejs')
})

//post route to post through mongo 
router.post('', async (req, res, next) => {
  try {
    const newRecipe = req.body
    await UserRecipe.create(req.body)
    console.log(newRecipe)
    res.redirect('/userRecipe')
  } catch (err) {
    console.log(err)
    next()
  }
})

//this is the index page
router.get('', async (req, res, next) => {
  try {
    recipes = await UserRecipe.find({});
    res.render('userRecipe/nyindex.ejs', { recipes })
  } catch (err) {
    next();
  }
});

//show route
router.get('/:id', async (req, res, next) => {
  try {
    console.log(req.params)
    const recipeSelected = await UserRecipe.findById(req.params.id)
    console.log(recipeSelected)
    res.render('userRecipe/nyshow.ejs', { recipe: recipeSelected })
  } catch (err) {
    next()
  }
})

//edit id route  
//http://localhost:4000/userRecipes/642f38c85744207ab83dda7a/edit
router.get('/:id/edit', async (req, res, next) => {
  try {
    const recipeToBeEdited = await UserRecipe.findById(req.params.id)
    res.render('userRecipe/nyedit.ejs', { recipe: recipeToBeEdited })
  } catch (err) {
    console.log(err)
    next()
  }
})

// will need to create user route // this route will update when we edit the selected recipe
router.put('/:id', async (req, res, next) => {
  try {
    const updatedRecipe = await UserRecipe.findByIdAndUpdate(
      req.params.id,
      req.body
    )
    console.log(updatedRecipe);
    res.redirect(`/userRecipe/${req.params.id}`)
  } catch (err) {
    console.log(err)
    next();
  }
})

// get route  // DELETE ROUTE //http://localhost:4000/recipes/642f38c85744207ab83dda82  //WE WANTED TO DELETE ONLY THIS RECIPE FOR TESTTING PURPOSES
router.get('/:id/delete', async (req, res, next) => {
  try {
    const recipeToBeDeleted = await UserRecipe.findById(req.params.id)
    // console.log(recipeToBeDeleted);
    res.render('userRecipe/delete.ejs', { recipe: recipeToBeDeleted })
  } catch (err) {
    console.log(err)
    next()
  }
})

// //delete route// will need to create user route
router.delete('/:id', async (req, res) => {
  try {
    const deletedItem = await UserRecipe.findByIdAndDelete(req.params.id)
    // console.log(deletedItem);
    res.redirect('/userRecipe')
  } catch (err) {
    console.log(err)
    next()
  }
})

module.exports = router
