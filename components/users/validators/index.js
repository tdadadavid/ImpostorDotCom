const { validateRequest, auth } = require('./login');
const { validateBody, ensureUniqueness} = require('./signUp');


module.exports = {
    validateRequest,
    validateBody,
    ensureUniqueness,
    auth
}