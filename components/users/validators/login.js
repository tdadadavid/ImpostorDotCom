const {errorMessage, catchAsyncError } = require('../../../utils/helpers')
const { loginSchema } = require('../validationSchema');
const Users = require("../model");

const validateRequest = catchAsyncError(async (req, res, next) => {
    const { error } = await loginSchema.validate(req.body);
    if (error) return errorMessage(res, 400, error.message);

    next();
});


const validateUser = catchAsyncError(async (req, res, next)  =>{
    const { email } = req.body;

    let user = await Users.findOne({ email });
    if (!user) return errorMessage(res, 404, "User is not authenticated");

    req.user = user;

    next();
});


module.exports = {
    validateRequest,
    validateUser
}