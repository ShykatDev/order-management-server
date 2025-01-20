const express = require('express');
const ProductController = require("../controllers/products.controller")
const authMiddleware = require('../middlewares/authMiddleware')

const productRoutes = express.Router();

productRoutes.use(authMiddleware)

productRoutes.get("/", ProductController.GetProducts)
productRoutes.post("/", ProductController.CreateProduct)
productRoutes.patch("/:id", ProductController.EditProduct)
productRoutes.delete("/:id", ProductController.DeleteProduct)

module.exports = productRoutes;