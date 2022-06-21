
const helpers = {

    successResponse: (res, status, message, data) => {
        res.status(status).json({
            status,
            message,
            data
        });
    },

    errorMessage: (res, status, message) => {
        res.status(status).json({
            status,
            message,
        });
    },

    catchAsyncError: (fn) => (req, res, next) => fn(req, res, next).catch(err => next(err)),


}



module.exports = helpers;
