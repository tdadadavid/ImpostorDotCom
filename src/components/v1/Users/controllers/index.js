"use strict";

const { catchAsyncError, successResponse, successMessage} = require("../../../../utils");
const UserService = require("../services/UserService");

const UserController = {

    signUp: catchAsyncError(async (req, res) => {

        const user = await UserService.createUser(req.body);

        const token = user.generateAuthToken();

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

    sendForgotPasswordEmail: catchAsyncError(async (req, res) => {
        const user = req.user;

        const password_reset_token = await user.generatePasswordResetToken();

        await UserService.sendResetPasswordMail(user.email, password_reset_token);

        successMessage(res, 200, "A reset-password email has been sent");
    }),

    resetPassword: catchAsyncError(async (req, res) => {
        const user = req.user;

        user.password = req.body.password;

        user.save();

        successMessage(res, 200, "Password reset successfully");
    }),
}


module.exports = UserController;