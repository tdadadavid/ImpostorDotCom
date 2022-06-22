"use strict";

const { transporter, htmlEmailBuilder} = require('./mail');
const {hash} = require("bcrypt");
const Users = require("../model");

class UserService {
    static async createUser(data) {
        const { firstname, lastname, email, phone, password } = data;

        const hashPassword = await hash(password, 11);

        return await Users.create({
            firstname,
            lastname,
            email,
            phone,
            password: hashPassword
        });
    }

    static async sendConfirmationMail(to, data){
        // const url = `http://localhost:3000/api/auth/confirmation/${data}`;

        const mailOptions = {
            from: "impostorDotCom@gmail.com",
            to,
            subject: "Welcome from Impostor ✅",
            html: htmlEmailBuilder(data),
        }

        return await transporter.sendMail(mailOptions);
    }

}


module.exports = UserService;