"use strict";

const dotenv = require('dotenv');
dotenv.config();

const config = {
    JWT: {
        ACCESS_TOKENS_SECRET: process.env.ACCESS_TOKENS_SECRET,
        tokenLifeSpan: process.env.ACCESS_TOKENS_LIFETIME
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
        tlsState: process.env.MAIL_TLS,
    },

    passwordReset: {
        token: process.env.PASSWORD_RESET_SECRET,
        tokenLifeSpan: process.env.PASSWORD_RESET_TOKEN_LIFETIME
    },

    port: process.env.port
}

module.exports = config;