const recipe = require('../services/recipe');
const user = require('../services/user');

module.exports = () => (req, res, next) => {
    req.storage = {
        ...recipe,
        ...user
    };
    next();
};