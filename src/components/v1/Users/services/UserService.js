"use strict";

const {mail} = require('../../../../config')
const { transporter, htmlEmailBuilder} = require('./mail');
const Users = require("../model");

class UserService {

    static async createUser(data) {

        const { firstname, lastname, email, phone, password } = data;

        return await Users.create({
            firstname,
            lastname,
            email,
            phone,
            password
        });

    }

    static async sendConfirmationMail(to){

        const mailOptions = {
            from: mail.adminAddress,
            to,
            subject: "Welcome from Impostor ✅",
            html: htmlEmailBuilder(),
        };

        await transporter.sendMail(mailOptions);
    }

    // refactor the html context
    static async sendResetPasswordMail(to, data){
        const mailOptions = {
            from: mail.adminAddress,
            to,
            subject: "Reset password.",
            html: `
                <h1>Forgot your password?</h1>
                
                <p> 
                    We received a request to reset your password. click 
                    <a href="http://localhost:3000/api/auth/users/resets/?access_token=Bearer ${ data }">Reset my password</a>
                    if you requested for a reset. Password reset link with expire in five minutes (5),
                    <a href="http://localhost:3000/api/auth/users/forgot-password">Request another</a>
                    If you didn't make this request, simply ignore this email.
                </p>
                
                
            `
        };

        await transporter.sendMail(mailOptions);
    }

}


module.exports = UserService;