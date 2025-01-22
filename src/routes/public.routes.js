const express = require('express');
const ProductController = require("../controllers/products.controller");
const PromotionsController = require("../controllers/promotions.controller");
const AuthController = require("../controllers/auth.contoller");

const router = express.Router();

router.get("/products", ProductController.GetProducts)
router.get("/promotions", PromotionsController.GetPromotions)
router.get("/me", AuthController.GetAccount)

module.exports = router;