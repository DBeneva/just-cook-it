const express = require('express');

const expressConfig = require('./config/express');
const databaseConfig = require('./config/database');
const routesConfig = require('./config/routes');
const middlewaresConfig = require('./config/middlewares');

const { PORT } = require('./config');

start();

async function start() {
    const app = express();

    expressConfig(app);
    await databaseConfig(app);
    await middlewaresConfig(app);
    routesConfig(app);

    app.listen(PORT, () => console.log(`Application started at http://localhost:${PORT}...`));
}