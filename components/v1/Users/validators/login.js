"use strict";

const {errorMessage, catchAsyncError } = require('../../../../utils')
const { loginSchema } = require('../validationSchema');
const Users = require("../model");

const validateRequest = catchAsyncError(async (req, res, next) => {
    const { error } = await loginSchema.validate(req.body);
    if (error) return errorMessage(res, 400, error.message);

    next();
});


const authUser = catchAsyncError(async (req, res, next)  =>{
    const { email } = req.body;

    let user = await Users.findOne({ email });
    if (!user) return errorMessage(res, 404, "User is not authenticated");

    req.user = user;

    next();
});

const confirmPassword = catchAsyncError(async (req, res, next) => {
    const { password } = req.body;
    const user = req.user;

    const isValid = await user.comparePassword(password);
    if(!isValid) return errorMessage(res, 400, "Passwords don't match");

    next();
})


module.exports = {
    validateRequest,
    authUser,
    confirmPassword
}