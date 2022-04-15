const auth = require('../middlewares/auth');
const storage = require('../middlewares/storage');
const logger = require('../middlewares/logger');

module.exports = async (app) => {
    app.use(auth());
    app.use(await storage());
    app.use(logger());
};