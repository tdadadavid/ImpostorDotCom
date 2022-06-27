"use strict";

const {mail} = require('../../../../config')
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: mail.host,
    port: mail.port,
    secureConnection: mail.secure,
    debug: true,
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
                Welcome to impostorDotCom, before we get started please click the link below <br>
                <a href="http://localhost:3000/api/auth/confirmations/${data}" methods="POST">Confirm mail</a>
            </p>
            
            <br>
                By confirming this we are going to be sending important and helpful mails to give you the best
                experience with us. Thanks
            <br>

    `;
}

module.exports = { transporter, htmlEmailBuilder };