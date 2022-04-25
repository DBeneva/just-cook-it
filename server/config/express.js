const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

module.exports = (app) => {
    app.use(
        cors({
            credentials: true,
            origin: 'http://localhost:4200',
            allowedHeaders: ['Content-Type', 'X-Authorization']
        })
    );
    app.use(cookieParser());
    app.use(express.json());
};