const express = require('express');
const SlabsController = require("../controllers/slabs.controller")
const authMiddleware = require('../middlewares/authMiddleware')

const slabsRoutes = express.Router();

slabsRoutes.use(authMiddleware)

slabsRoutes.get("/", SlabsController.GetSlabs)
slabsRoutes.post("/", SlabsController.CreateSlabs)

module.exports = slabsRoutes;