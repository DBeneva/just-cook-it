const authController = require('../controllers/authController');
const homeController = require('../controllers/homeController');
const recipeController = require('../controllers/recipeController');

module.exports = (app) => {
    app.use('/', homeController);
    app.use('/auth', authController);
    app.use('/recipes', recipeController);
};