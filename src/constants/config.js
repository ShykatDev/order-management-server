require('dotenv').config();

const config = {
    port: process.env.PORT || 8080,
    apiVersion: process.env.API_VERSION,
}

module.exports = Object.freeze(config);