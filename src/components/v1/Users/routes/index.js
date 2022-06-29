"use strict";

const {
    validateBody,
    ensureUniqueness,
    validateRequest,
    authUser,
    confirmPassword,
    forgotPasswordValidator,
    resetPasswordValidator,
    isValidEmail
} = require("../validators");

const UserController = require('../controllers')
const { isAuthorized } = require('../../../../middlewares');

const { Router } = require('express');
const userRouter = Router();

// refactor authUser and isAuthenticated, this is bad code
userRouter.post('/', [validateBody, ensureUniqueness], UserController.signUp);
userRouter.post('/login', [validateRequest, authUser, confirmPassword], UserController.login);
userRouter.post('/forgot-password', [ forgotPasswordValidator, authUser ], UserController.sendForgotPasswordEmail);
userRouter.post('/resets', [isAuthorized, resetPasswordValidator], UserController.resetPassword);
userRouter.post('/mail-confirmations/:token', [isValidEmail], UserController.confirmUser);


module.exports = userRouter;