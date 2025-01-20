require('dotenv').config();

const config = {
    port: process.env.PORT || 8080,
    apiVersion: process.env.API_VERSION,
    accessToken: process.env.ACCESS_TOKEN,
    refreshToken: process.env.REFRESH_TOKEN,
}

module.exports = Object.freeze(config);