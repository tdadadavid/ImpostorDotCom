"use strict";

const { validateRequest, authUser, confirmPassword } = require('./login');
const { validateBody, ensureUniqueness} = require('./signUp');
const passwordResetValidator = require('../validators/password-reset');


module.exports = {
    validateRequest,
    validateBody,
    ensureUniqueness,
    authUser,
    confirmPassword,
    passwordResetValidator
}