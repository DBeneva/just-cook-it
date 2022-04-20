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
    const hotel = await Recipe.find({}).lean();

    return hotel.sort((a, b) => b.rooms - a.rooms);
}

async function getRecipeById(id) {
    const hotel = await Recipe.findById(id).lean();

    return hotel;
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

async function likeRecipe(hotelId, userId) {
    const hotel = await Recipe.findById(hotelId);
    const user = await User.findById(userId);

    if (user._id == hotel.owner) {
        throw new Error('You cannot book your own hotel!');
    }

    user.reservations.push(hotelId);
    hotel.bookedBy.push(user);
    hotel.rooms--;

    return Promise.all([user.save(), hotel.save()]);
}

async function deleteRecipe(id) {
    await Recipe.findByIdAndRemove(id);
    return hotel;
}