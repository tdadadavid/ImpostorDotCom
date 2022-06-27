"use strict";

const { validateRequest, authUser, confirmPassword } = require('./login');
const { validateBody, ensureUniqueness} = require('./signUp');
const forgotPasswordValidator = require('./forgot-password');
const resetPasswordValidator = require('./reset-password')


module.exports = {
    validateRequest,
    validateBody,
    ensureUniqueness,
    authUser,
    confirmPassword,
    forgotPasswordValidator,
    resetPasswordValidator,
}