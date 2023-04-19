const mongoose = require('mongoose');

const userRecipeSchema = new mongoose.Schema(
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
    serves: {
        type: String,
        required: [true, "Please provide a number of servings"],
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

const UserRecipe = mongoose.model('userRecipe', userRecipeSchema);

module.exports = UserRecipe;