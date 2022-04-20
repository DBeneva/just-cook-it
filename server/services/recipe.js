const Recipe = require('../models/Recipe');
const User = require('../models/User');

module.exports = {
    getAllRecipes,
    getRecipeById,
    createRecipe,
    editRecipe,
    likeRecipe,
    deleteRecipe
};

async function getAllRecipes() {
    console.log('in server recipe service');
    const recipes = await Recipe.find({}).lean();

    return recipes;
}

async function getRecipeById(id) {
    const recipe = await Recipe.findById(id).lean();

    return recipe;
}

async function createRecipe(recipeData) {
    const recipe = new Recipe(recipeData)
    await recipe.save();

    const owner = await User.findById(recipe.owner);
    const userRecipes = owner.recipes;
    userRecipes.push(recipe._id);
    await owner.save();
    
    return recipe;
}

async function editRecipe(id, hotelData) {
    return await Recipe.findByIdAndUpdate(id, hotelData, { runValidators: true }).lean();
}

async function likeRecipe(recipeId, userId) {
    const recipe = await Recipe.findById(recipeId);
    const user = await User.findById(userId);

    if (user._id == recipe.owner) {
        throw new Error('You cannot book your own hotel!');
    }

    user.likedRecipies.push(recipeId);
    recipe.likedBy.push(user);
    // recipe.likes--;

    return Promise.all([user.save(), recipe.save()]);
}

async function deleteRecipe(id) {
    return await Recipe.findByIdAndRemove(id);
}