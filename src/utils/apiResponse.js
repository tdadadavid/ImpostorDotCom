
const apiResponse = {

    successResponse: (res, status, message, data) => {
        res.status(status).json({
            status,
            message,
            data
        });
    },

    successMessage: (res, status, message) => {
      res.status(status).json({
          status,
          message
      });
    },

    errorMessage: (res, status, message) => {
        res.status(status).json({
            status,
            message,
        });
    },

}



module.exports = apiResponse;
