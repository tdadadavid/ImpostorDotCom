const _ = require('lodash');
const helmet = require('helmet');
const { successResponse,errorMessage, catchAsyncError } = require('./utils/helpers')
const Users = require('./components/users/model');
const { validateBody, ensureUniqueness, auth, validateRequest } = require('./components/users/validators')
const { hash,compare } = require('bcrypt');
const express = require('express');

const app = express();

app.use(express.json());
app.use(helmet());

app.post('/api/auth/users', [validateBody, ensureUniqueness], catchAsyncError(async (req, res) => {

   const { firstname, lastname, email, phone, password } = req.body;

   const hashPassword = await hash(password, 11);

   const user = new Users({
      firstname,
      lastname,
      email,
      phone,
      password: hashPassword
   });

   const result = await user.save();

   return successResponse(res, 201, "Nice one, registration successful", [result.transform()]);
}));

// minimum implementation
app.post('/api/auth/users/login', [validateRequest, auth], catchAsyncError(async (req, res) => {
    const { password } = req.body;
    let user = req.user;

    const isValid = await compare(password, user.password);
    if(!isValid) return errorMessage(res, 400, "Passwords don't match");

    const token = user.generateAuthToken();
    user = user.transform();

    // add token to response payload.
    user.token = token;

    return successResponse(res, 200, "Welcome", [ user ]);
}));

app.use((err, req, res, next) => {
   return errorMessage(res, 500, err.toString());
});


module.exports = app;