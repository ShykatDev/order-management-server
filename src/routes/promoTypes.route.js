const express = require('express');
const PromoTypeController = require("../controllers/promoTypes.controller")
const authMiddleware = require('../middlewares/authMiddleware')

const promoTypeRoutes = express.Router();

promoTypeRoutes.use(authMiddleware)

promoTypeRoutes.get("/", PromoTypeController.GetPromoTypes)
promoTypeRoutes.post("/", PromoTypeController.CreatePromoTypes)

module.exports = promoTypeRoutes;