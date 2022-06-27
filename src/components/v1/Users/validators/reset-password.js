const { resetPasswordSchema } = require('../validationSchema');
const {catchAsyncError, errorMessage} = require("../../../../utils");

const resetPasswordValidator = catchAsyncError(async (req, res, next) => {
    const { error } = await resetPasswordSchema.validate(req.body);
    if (error) return errorMessage(res, 400, error.message);

    next();
});

module.exports = resetPasswordValidator;