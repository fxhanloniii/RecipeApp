const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema(
  {
    recipe_name: {
      type: String,
      required: [true, "Please provide a recipe name"],
    },
    category: {
      type: String,
      required: false,
    },
    cuisine: {
      type: String,
      required: false,
    },
    prep_time: {
      type: String,
      required: [true, "Please provide a preparation time"],
    },
    serves: {
      type: String,
      required: [true, "Please provide a number of servings"],
    },
    ingredients: {
      type: [String],
      required: [true, "Please provide a list of ingredients"],
    },
    cooking_method: {
      type: [String],
      required: [true, "Please provide a cooking method"],
    },
    image: {
      type: String,
      required: [true, "Please provide a URL for an image"],
    },
    tags: {
      type: [String],
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Recipe = mongoose.model('Recipe', recipeSchema, 'RecipeDB');

module.exports = Recipe;
