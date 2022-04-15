const authController = require('../controllers/authController');
const profileController = require('../controllers/profileController');
const recipeController = require('../controllers/recipeController');

module.exports = (app) => {
    app.use('/user', profileController);
    app.use('/auth', authController);
    app.use('/recipes', recipeController);
};