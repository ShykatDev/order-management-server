const express = require('express');
const AuthController = require("../controllers/auth.contoller")

const authRoutes = express.Router();

authRoutes.post("/register", AuthController.Register)
authRoutes.post("/login", AuthController.SignIn)

module.exports = authRoutes;