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
router.get('/cuisines', (req, res) => {
  res.render('cuisine.ejs');
});

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
    res.render('cuisineIndex.ejs', { recipes: recipes })
  } catch (err) {
    console.log(err)
    next()
  }
})

router.get('/holidays', async (req, res, next) => {
  try {
    const recipes = await Recipe.find({
      $or: [
        {recipe_name: {$regex: "holiday", $options: 'i' }},
        {recipe_name: {$regex: "holiday", $options: 'i' }}
      ]
    });
    res.render('tags.ejs', {recipes: recipes});
  } catch(err) {
    console.log(err);
    next();
  }
})

router.get('/dessert', async (req, res, next) => {
  try {
    const recipes = await Recipe.find({
      $or: [
        {recipe_name: {$regex: "dessert", $options: 'i' }},
        {recipe_name: {$regex: "dessert", $options: 'i' }}
      ]
    });
    res.render('tags.ejs', {recipes: recipes});
  } catch(err) {
    console.log(err);
    next();
  }
})

router.get('/smoothies', async (req, res, next) => {
  try {
    const recipes = await Recipe.find({
      $or: [
        {recipe_name: {$regex: "smoothie", $options: 'i' }},
        {recipe_name: {$regex: "smoothie", $options: 'i' }}
      ]
    });
    res.render('tags.ejs', {recipes: recipes});
  } catch(err) {
    console.log(err);
    next();
  }
})

router.get('/snacks', async (req, res, next) => {
  try {
    const recipes = await Recipe.find({
      $or: [
        {recipe_name: {$regex: "snack", $options: 'i' }},
        {recipe_name: {$regex: "snack", $options: 'i' }}
      ]
    });
    res.render('tags.ejs', {recipes: recipes});
  } catch(err) {
    console.log(err);
    next();
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
//http://localhost:4000/recipes/642f38c85744207ab83dda7a/edit
router.get('/:id/edit', async (req, res, next) => {
  try {
    const recipeToBeEdited = await Recipe.findById(req.params.id)
    res.render('edit.ejs', { recipe: recipeToBeEdited })
  } catch (err) {
    console.log(err)
    next()
  }
})

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

router.get('/:id/delete', async (req, res, next) => {
  try {
    const recipeToBeDeleted = await Recipe.findById(req.params.id)
    // console.log(recipeToBeDeleted);
    res.render('delete.ejs', { recipe: recipeToBeDeleted })
  } catch (err) {
    console.log(err)
    next()
  }
})

// //delete route (added by SA) // will need to create user route
router.delete('/:id', async (req, res) => {
  try {
    const deletedItem = await Recipe.findByIdAndDelete(req.params.id)
    // console.log(deletedItem);
    res.redirect('/recipes')
  } catch (err) {
    console.log(err)
    next()
  }
})

module.exports = router
