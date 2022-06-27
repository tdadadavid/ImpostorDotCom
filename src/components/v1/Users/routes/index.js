"use strict";

const UserController = require('../controllers')
const { validateBody, ensureUniqueness, validateRequest, authUser, confirmPassword, passwordResetValidator} = require("../validators");
const { isAuthenticated } = require('../../../../middlewares');

const { Router } = require('express');
const userRouter = Router();

userRouter.post('/', [validateBody, ensureUniqueness], UserController.signUp);
userRouter.post('/login', [validateRequest, authUser, confirmPassword], UserController.login);
userRouter.post('/forgot-password', [ passwordResetValidator, authUser ], UserController.sendForgotPasswordEmail);
userRouter.post('/resets/', [isAuthenticated]);


module.exports = userRouter;