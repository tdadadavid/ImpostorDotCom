const dotenv = require('dotenv');
dotenv.config();

const config = {
    JWT: {
        ACCESS_TOKENS_SECRET: process.env.ACCESS_TOKENS_SECRET,
        expirationDate: process.env.ACCESS_TOKENS_LIFETIME
    },

    db: {
        dev: {

        },
    }
}

module.exports = config;