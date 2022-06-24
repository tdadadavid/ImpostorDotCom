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

    static async sendConfirmationMail(to, data){

        const mailOptions = {
            from: mail.adminAddress,
            to,
            subject: "Welcome from Impostor ✅",
            html: htmlEmailBuilder(data),
        };

        await transporter.sendMail(mailOptions);
    }

    static async sendResetPasswordMail(to, data){
        const mailOptions = {
            from: mail.adminAddress,
            to,
            subject: "Reset password.",
            html: `
                <h1>Forgot your password?</h1>
                
                <p> 
                    We received a request to reset your password.
                    If you didn't make this request, simply ignore this email.
                </p>
                
                <a href="http://localhost:3000/api/auth/users/resets/${ data }">Reset my password</a>
            `
        };

        await transporter.sendMail(mailOptions);
    }

}


module.exports = UserService;