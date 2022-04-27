const User = require('../models/User');
const Recipe = require('../models/Recipe');

module.exports = {
    createUser,
    getUserByUsername,
    getUserByEmail,
    getUserById,
    editAccount,
    changePassword,
    deleteAccount
};

async function createUser(username, email, hashedPassword) {
    const user = new User({ username, email, hashedPassword });
    return await user.save();
}

async function getUserByUsername(username) {
    const user = User.findOne({
        username: {
            $regex: `^${username}$`,
            $options: 'i'
        }
    });

    return await user.lean();
}

async function getUserByEmail(email) {
    const user = User.findOne({ email });
    return await user.lean();
}

async function getUserById(id) {
    const user = User.findById(id);
    return await user.lean();
}

async function editAccount(userId, accountData) {
    console.log('user service account data', accountData);
    console.log('user service userId', userId);
    await User.findByIdAndUpdate(userId, accountData).lean();
    const editedAccountData = await User.findById(userId).lean();
    console.log('user service edited account data', editedAccountData);
    
    return {
        username: editedAccountData.username,
        email: editedAccountData.email,
        _id: editedAccountData._id,
        recipes: editedAccountData.recipes,
        likedRecipes: editedAccountData.likedRecipes 
    };
}

async function changePassword(userId, hashedPassword) {
    await User.findByIdAndUpdate(userId, { hashedPassword }).lean();
    const user = await User.findById(userId).lean();
    console.log('user service edited account data', user);
    
    return {
        username: user.username,
        email: user.email,
        _id: user._id
    };
}

async function deleteAccount(userId) {
    const user = await User.findById(userId);
    console.log(user);

    for (let recipeId of user.recipes) {
        await Recipe.findByIdAndRemove(recipeId);
    }

    for (let recipeId of user.likedRecipes) {
        const recipe = await Recipe.findById(recipeId);
        recipe.likedBy.splice(recipe.likedBy.indexOf(userId), 1);
        await recipe.save();
    }
    
    return await User.findByIdAndRemove(userId);
}