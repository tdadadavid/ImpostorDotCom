const {errorMessage, catchAsyncError } = require('../../../utils/helpers')
const { registrationSchema } = require('../validationSchema');
const Users = require("../model");

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


module.exports = {
    validateBody,
    ensureUniqueness
}