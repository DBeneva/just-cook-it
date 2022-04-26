const Recipe = require('../models/Recipe');
const User = require('../models/User');

module.exports = {
    getAllRecipes,
    getRecipeById,
    createRecipe,
    editRecipe,
    likeRecipe,
    unlikeRecipe,
    deleteRecipe
};

async function getAllRecipes() {
    const recipes = Recipe.find({});
    return await recipes.lean();
}

async function getRecipeById(id) {
    const recipe = Recipe.findById(id);
    return await recipe.lean();
}

async function createRecipe(recipeData) {
    const recipe = new Recipe(recipeData);
    await recipe.save();

    const owner = await User.findById(recipe.owner);
    const userRecipes = owner.recipes;
    userRecipes.push(recipe._id);
    await owner.save();
    
    return recipe;
}

async function editRecipe(recipeId, recipeData) {
    await Recipe.findByIdAndUpdate(recipeId, recipeData).lean();
    return await Recipe.findById(recipeId).lean();
}

async function likeRecipe(recipeId, userId) {
    const recipe = await Recipe.findById(recipeId);
    const user = await User.findById(userId);

    if (user._id == recipe.owner) {
        throw new Error('You cannot like your own recipe!');
    }

    if (recipe.likedBy.includes(user._id)) {
        throw new Error('You have already liked this recipe!');
    }

    user.likedRecipes.push(recipeId);
    await user.save();

    recipe.likedBy.push(userId);
    await recipe.save();

    return await Recipe.findById(recipeId).lean();
}

async function unlikeRecipe(recipeId, userId) {
    const recipe = await Recipe.findById(recipeId);
    const user = await User.findById(userId);

    if (user._id == recipe.owner) {
        throw new Error('You cannot like your own recipe!');
    }

    user.likedRecipes.splice(user.likedRecipes.indexOf(recipeId), 1);
    await user.save();

    recipe.likedBy.splice(user.likedRecipes.indexOf(userId), 1);
    await recipe.save();

    return await Recipe.findById(recipeId).lean();
}

async function deleteRecipe(recipeId, userId) {
    const recipe = await Recipe.findById(recipeId);
    const user = await User.findById(userId);

    user.recipes.splice(user.recipes.indexOf(recipeId), 1);
    await user.save();

    for (let userId of recipe.likedBy) {
        const user = await User.findById(userId);
        user.likedRecipes.splice(user.likedRecipes.indexOf(recipeId), 1);
        await user.save();
    }

    return await Recipe.findByIdAndRemove(recipeId);
}