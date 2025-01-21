const express = require('express');
const catchError = require('./utils/catchErrors');
const errorHandler = require("./middlewares/errorHandler");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.route");
const commonRoutes = require("./routes/common.route");
const productRoutes = require("./routes/products.route");
const promotionRoutes = require("./routes/promotions.route");
const slabRoutes = require("./routes/slabs.route");
const promoTypeRoutes = require("./routes/promoTypes.route");
const cartRoutes = require("./routes/cart.routes");
const config = require('./constants/config');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/health-check', catchError((req, res) => {
    res.status(200).json({
        status: 'OK',
        message: "Server health is Good"
    });
}))

// Auth Routes
app.use(`${config.apiVersion}/auth`, authRoutes);
app.use(`${config.apiVersion}/me`, commonRoutes);
app.use(`${config.apiVersion}/products`, productRoutes);
app.use(`${config.apiVersion}/promotions`, promotionRoutes);
app.use(`${config.apiVersion}/slabs`, slabRoutes);
app.use(`${config.apiVersion}/promo-types`, promoTypeRoutes);
app.use(`${config.apiVersion}/cart`, cartRoutes);

app.use(errorHandler);

module.exports = app;