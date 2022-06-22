"use strict";

const {mail} = require('../../../../config')
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: mail.host,
    port: mail.port,
    secureConnection: mail.secure,
    debug: true,
    logger: true,
    auth: {
        user: mail.user,
        pass: mail.password
    },
    tls: {
        rejectedUnauthorized: mail.tlsState
    }
});

const htmlEmailBuilder = (data) => {
    return `
            <h1>Hey Dear</h1>
            <p>
                Thanks for signing up with us. We'll like you to confirm your email within 3 days.
                If you've passed the allocated duration (3 days) you can request for a email verification 
                using.
            </p>
            <a href="http://localhost:3000/api/auth/confirmation/${ data }" methods="POST">Confirm mail</a>
    `;
}

module.exports = { transporter, htmlEmailBuilder };