const express = require('express')
const router = express.Router()
const { Recipe } = require('../models')

router.get('/recipe', (req, res) => {
  res.render('/index.ejs', { Recipe })
})


router.get('/:cuisine', async (req, res, next) => {
    try {
        console.log(req.params);
        let { cuisine } = req.params;
        cuisine = cuisine[0].toUpperCase() + cuisine.substring(1,cuisine.length);
        // cuisine = cuisine.replaceAll
        console.log(cuisine);
        // const recipes = await Recipe.find({ 'cuisine': {$regex:/cuisine/i} });
        const recipes = await Recipe.find({ 'cuisine': `['${cuisine}']` });
        //const recipes = await Recipe.find
        res.render('cuisine.ejs', {recipes: recipes})
    } catch(err) {
        console.log(err);
        next();
    }
});

module.exports = router;










