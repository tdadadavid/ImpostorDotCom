const {errorMessage} = require("../utils");


module.exports = (err, req, res, next) => {
    return errorMessage(res, 500, err.toString());
}