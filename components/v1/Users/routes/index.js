"use strict";

const UserController = require('../controllers')
const { validateBody, ensureUniqueness, validateRequest, authUser, confirmPassword, passwordResetValidator} = require("../validators");

const { Router } = require('express');
const userRouter = Router();

userRouter.post('/', [validateBody, ensureUniqueness], UserController.signUp);
userRouter.post('/login', [validateRequest, authUser, confirmPassword], UserController.login);
userRouter.post('/forgotPassword', [ passwordResetValidator ]);


module.exports = userRouter;