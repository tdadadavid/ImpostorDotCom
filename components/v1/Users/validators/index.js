const { validateRequest, authUser, confirmPassword } = require('./login');
const { validateBody, ensureUniqueness} = require('./signUp');


module.exports = {
    validateRequest,
    validateBody,
    ensureUniqueness,
    authUser,
    confirmPassword
}