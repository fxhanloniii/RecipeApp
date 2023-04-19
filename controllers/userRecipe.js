const express = require('express')
const router = express.Router()
const UserRecipe = require('../models/userRecipe')

//new route (added by SA)
// http://localhost:4000/userRecipe/new
router.get('/new', (req, res) => {
  res.render('userRecipe/new.ejs')
})

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

router.get('', async (req, res, next) => {
  try {
    recipes = await UserRecipe.find({});
    res.render('index.ejs', { recipes })
  } catch (err) {
    next();
  }
});


//post route to post through mongo (added by SA)

//edit id route (added by SA) //have editing recipes on a separate page from originals?? using a user route
//http://localhost:4000/myRecipes/642f38c85744207ab83dda7a/edit
router.get('recipes/:id/edit', async (req, res, next) => {
  try {
    const recipeToBeEdited = await userRecipe.findById(req.params.id)
    res.render('userRecipe/edit.ejs', { recipe: recipeToBeEdited })
  } catch (err) {
    console.log(err)
    next()
  }
})

//(added by SA) // will need to create user route // this route will update when we edit the selected recipe
router.put('/:id', async (req, res, next) => {
  try {
    const updatedRecipe = await userRecipe.findByIdAndUpdate(
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

// get route (added by SA) // DELETE ROUTE //http://localhost:4000/recipes/642f38c85744207ab83dda82  //WE WANTED TO DELETE ONLY THIS RECIPE FOR TESTTING PURPOSES
router.get('/:id/delete', async (req, res, next) => {
  try {
    const recipeToBeDeleted = await userRecipe.findById(req.params.id)
    // console.log(recipeToBeDeleted);
    res.render('userRecipe/delete.ejs', { recipe: recipeToBeDeleted })
  } catch (err) {
    console.log(err)
    next()
  }
})

// //delete route (added by SA) // will need to create user route
router.delete('/:id', async (req, res) => {
  try {
    const deletedItem = await userRecipe.findByIdAndDelete(req.params.id)
    // console.log(deletedItem);
    res.redirect('/userRecipe')
  } catch (err) {
    console.log(err)
    next()
  }
})

module.exports = router
