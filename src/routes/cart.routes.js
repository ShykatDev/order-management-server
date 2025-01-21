const express = require('express');
const CartController = require("../controllers/cart.controller")
const authMiddleware = require('../middlewares/authMiddleware')

const cartRoutes = express.Router();

cartRoutes.use(authMiddleware)

cartRoutes.get("/", CartController.GetCarts)
cartRoutes.post("/", CartController.CreateCart)

module.exports = cartRoutes;