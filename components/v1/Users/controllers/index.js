"use strict";

const { catchAsyncError, successResponse} = require("../../../../utils");
const UserService = require("../services/UserService");

const UserController = {

    signUp: catchAsyncError(async (req, res) => {

        const user = await UserService.createUser(req.body);

        const token = user.generateAuthToken();

        // send email verification message to user email.
        await UserService.sendConfirmationMail(user.email, token);

        return successResponse(
             res,
            201,
            "registration successful, An email has been sent to you",
            [ user.transform() ]
        );
    }),

    login: catchAsyncError(async (req, res) => {

        let user = req.user;

        const token = user.generateAuthToken();

        user = user.transform();

        user.token = token;

        return successResponse(res, 200, "Welcome", [ user ]);
    }),

    sendResetEmail: catchAsyncError(async (req, res) => {
        res.status(200).send({
            message: "An email has been sent to you."
        });
    }),
}


module.exports = UserController;