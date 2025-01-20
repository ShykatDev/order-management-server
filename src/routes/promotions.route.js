const express = require('express');
const PromotionsController = require("../controllers/promotions.controller")
const authMiddleware = require('../middlewares/authMiddleware')

const productRoutes = express.Router();

productRoutes.use(authMiddleware)

productRoutes.get("/", PromotionsController.GetPromotions)
productRoutes.post("/", PromotionsController.CreatePromotions)
productRoutes.patch("/:id", PromotionsController.EditPromotions)
productRoutes.delete("/:id", PromotionsController.DeletePromotions)

module.exports = productRoutes;