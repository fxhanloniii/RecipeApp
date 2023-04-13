const express = require('express')
const router = express.Router()
const { Recipe } = require('../models')

//new route (added by SA)
// http://localhost:4000/myRecipes/new
router.get('/new', (req, res) => {
  res.render('myRecipes/new.ejs')
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

//edit id route (added by SA) //have editing recipes on a separate page from originals?? using a user route
//http://localhost:4000/myRecipes/642f38c85744207ab83dda7a/edit
router.get('/:id/edit', async (req, res, next) => {
  try {
    const recipeToBeEdited = await Recipe.findById(req.params.id)
    res.render('myRecipes/edit.ejs', { recipe: recipeToBeEdited })
  } catch (err) {
    console.log(err)
    next()
  }
})

//(added by SA) // will need to create user route // this route will update when we edit the selected recipe
router.put('/:id', async (req, res, next) => {
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body
    )
    console.log(updatedRecipe);
    res.redirect(`/recipes/${req.params.id}`)
  } catch (err) {
    console.log(err)
    next()
  }
})

// // get route (added by SA) // will need to create user route
// router.get('/:id/delete', async (req, res, next) => {
//   try {
//     const recipeToBeDeleted = await Recipe.findById(req.params.id)
//     // console.log(recipeToBeDeleted);
//     res.render('recipe/delete.ejs', { recipe: recipeToBeDeleted })
//   } catch (err) {
//     console.log(err)
//     next()
//   }
// })

// //delete route (added by SA) // will need to create user route
// router.delete('/:id', async (req, res) => {
//   try {
//     const deletedItem = await Recipe.findByIdAndDelete(req.params.id)
//     // console.log(deletedItem);
//     res.redirect('/recipe')
//   } catch (err) {
//     console.log(err)
//     next()
//   }
// })

module.exports = router
