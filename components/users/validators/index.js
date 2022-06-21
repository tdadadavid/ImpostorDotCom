const { validateRequest, validateUser } = require('./login');
const { validateBody, ensureUniqueness} = require('./signUp');


module.exports = {
    validateRequest,
    validateBody,
    ensureUniqueness,
    validateUser
}