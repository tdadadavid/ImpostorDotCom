"use strict";

const UserService = require('./components/v1/Users/services/UserService')
const helmet = require('helmet');
const { successResponse,errorMessage, catchAsyncError } = require('./utils');
const { validateBody, ensureUniqueness, validateUser, validateRequest } = require('./components/v1/Users/validators')
const express = require('express');

const app = express();

app.use(express.json());
app.use(helmet());

app.post('/api/auth/users', [validateBody, ensureUniqueness], catchAsyncError(async (req, res) => {

   const user = await UserService.createUser(req.body);

   const token = user.generateAuthToken();

   // send email verification message to user email.
    await UserService.sendConfirmationMail(user.email, token);

   return successResponse(res, 201, "registration successful, An email has been sent to you", [ user.transform() ]);
}));

app.post('/api/auth/users/login', [validateRequest, validateUser], catchAsyncError(async (req, res) => {

    let user = req.user;

    const token = user.generateAuthToken();

    user = user.transform();

    user.token = token;

    return successResponse(res, 200, "Welcome", [ user ]);
}));

app.use((err, req, res, next) => {
   return errorMessage(res, 500, err.toString());
});


module.exports = app;