"use strict";

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
    },

    mail: {
        adminAddress: process.env.MAIL_ADMIN,
        user: process.env.MAIL_USERNAME,
        password: process.env.MAIL_PASSWORD,
        port: process.env.MAIL_PORT,
        host: process.env.MAIL_HOST,
        secure: process.env.MAIL_SECURE,
        tlsState: process.env.MAIL_TLS
    },

    port: process.env.port
}

module.exports = config;