"use strict";

const { forgotPassword } = require('../validationSchema');
const {catchAsyncError, errorMessage} = require("../../../../utils");

const forgotPasswordValidator = catchAsyncError(async (req, res, next) => {
    const { error } = await forgotPassword.validate(req.body);
    if (error) return errorMessage(res, 400, error.message);

    next();
});

module.exports = forgotPasswordValidator;