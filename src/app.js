const express = require('express');
const catchError = require('./utils/catchErrors');


const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get('/health-check', catchError((req, res) => {
    res.status(200).json({
        status: 'OK',
        message: "Server health is Good"
    });
}))

module.exports = app;