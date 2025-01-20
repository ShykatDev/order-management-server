const express = require('express');
const catchError = require('./utils/catchErrors');
const errorHandler = require("./middlewares/errorHandler");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.route");
const commonRoutes = require("./routes/common.route");
const config = require('./constants/config');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/health-check', catchError((req, res) => {
    res.status(200).json({
        status: 'OK',
        message: "Server health is Good"
    });
}))

// Auth Routes
app.use(`${config.apiVersion}/auth`, authRoutes);
app.use(`${config.apiVersion}/me`, commonRoutes);

app.use(errorHandler);

module.exports = app;