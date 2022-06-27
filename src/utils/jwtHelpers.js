const {JWT} = require('../config')
const { verify } = require('jsonwebtoken');

const tokenFunctions = {

    getAccessToken: async (req) => {
      const accessToken = req.header.authorization ||
                          req.header.Authorization ||
                          req.body.access_token ||
                          req.query.access_token;

      if (!accessToken && !accessToken.startsWith('Bearer')) return null;

      return accessToken.split(' ')[1];
    },

    verifyAuthToken:  (token, secret) => {
        return verify(token, secret);
    }
}



module.exports = tokenFunctions;