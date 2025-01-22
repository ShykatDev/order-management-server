const express = require('express');
const OrdersController = require("../controllers/orders.controller")
const authMiddleware = require('../middlewares/authMiddleware')

const ordersRoutes = express.Router();

ordersRoutes.use(authMiddleware)

ordersRoutes.get("/", OrdersController.GetOrders)
ordersRoutes.post("/", OrdersController.CreateOrder)

module.exports = ordersRoutes;