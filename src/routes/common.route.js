const express = require('express');
const AuthController = require("../controllers/auth.contoller")
const authMiddleware = require('../middlewares/authMiddleware')

const commonRoutes = express.Router();

commonRoutes.use(authMiddleware)

commonRoutes.get("/", AuthController.GetAccount)

module.exports = commonRoutes;