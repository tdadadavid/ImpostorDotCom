"use strict";

const Users = require('../components/v1/Users/model');
const { passwordReset } = require('../config')
const { getAccessToken, verifyAuthToken } = require('../utils')
const {errorMessage} = require("../utils");

const isAuthorized = async (req, res, next) => {
    try{
        const accessToken = await getAccessToken(req);

        if (!accessToken) return errorMessage(res, 401, "No token provided");

        const userID = await verifyAuthToken(accessToken, passwordReset.TOKEN_SECRET);

        const user = await Users.findById(userID);

        if (!user) return errorMessage(res, 403, "Unauthorized Action");

        req.user = user;
        next();
    }catch (err){
        console.log(err); // replace with winston logger
        errorMessage(res, 422,"Invalid token provided");
    }
}

module.exports = isAuthorized;