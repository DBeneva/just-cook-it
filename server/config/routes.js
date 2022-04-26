const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const recipeController = require('../controllers/recipeController');

module.exports = (app) => {
    app.use('/auth', authController);
    app.use('/recipes', recipeController);
    app.use('/users', userController);
};