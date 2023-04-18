const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema(
  {
    recipe_name: {
        type: String,
        required: [true, "Please provide a recipe name"],
    },
    ingredients: {
        type: [String],
        required: [true, "Please provide a list of ingredients"],
    },
    prep_time: {
        type: String,
        required: [true, "Please provide a preparation time"],
    },
    cooking_method: {
        type: [String],
        required: [true, "Please provide a cooking method"],
    },
    image: {
        type: String,
        required: [true, "Please provide a URL for an image"],
      },
    },
    {
     timestamps: true,  
    }
);

const userRecipe = mongoose.model('userRecipe', recipeSchema);

module.exports = userRecipe;