const {errorMessage, catchAsyncError } = require('../../../../utils')
const { loginSchema } = require('../validationSchema');
const Users = require("../model");
const {compare} = require("bcrypt");

const validateRequest = catchAsyncError(async (req, res, next) => {
    const { error } = await loginSchema.validate(req.body);
    if (error) return errorMessage(res, 400, error.message);

    next();
});


const validateUser = catchAsyncError(async (req, res, next)  =>{
    const { email, password } = req.body;

    let user = await Users.findOne({ email });
    if (!user) return errorMessage(res, 404, "User is not authenticated");

    const isValid = await compare(password, user.password);
    if(!isValid) return errorMessage(res, 400, "Passwords don't match");

    req.user = user;

    next();
});


module.exports = {
    validateRequest,
    validateUser
}