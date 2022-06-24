"use strict";

const { passwordResetSchema } = require('../validationSchema');
const {catchAsyncError, errorMessage} = require("../../../../utils");

const passwordResetValidator = catchAsyncError(async (req, res, next) => {
    const { error } = await passwordResetSchema.validate(req.body);
    if (error) return errorMessage(res, 400, error.message);

    next();
});

module.exports = passwordResetValidator;