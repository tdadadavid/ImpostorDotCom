const {errorMessage, catchAsyncError, verifyAuthToken } = require('../../../../utils')
const { registrationSchema } = require('../validationSchema');
const Users = require("../model");
const {JWT} = require("../../../../config");

const validateBody = catchAsyncError(async (req, res, next) => {
    const { error } = await registrationSchema.validate(req.body);
    if (error) return errorMessage(res, 400, error.message);

    next();
});


const ensureUniqueness = catchAsyncError(async (req, res, next)  =>{
    const { email, name: username } = req.body;

    let user = await Users.findOne({email});
    if (user) return errorMessage(res, 400, "Email already in use");

    user = await Users.findOne({ username });
    if (user) return errorMessage(res, 400, "Username already in use");

    next();
});

const isValidEmail = catchAsyncError(async (req, res, next) => {
    const { email } = await verifyAuthToken(req.params.token, JWT.ACCESS_TOKENS_SECRET);

    if (!email) return errorMessage(res, 400, "Invalid token");

    const user = await Users.findOne({ email: email });
    if (!user) return errorMessage(res, 404, "User is not authenticated");

    req.user = user;

    next();
});


module.exports = {
    validateBody,
    ensureUniqueness,
    isValidEmail
}