const helmet = require('helmet');
const { successResponse,errorMessage, catchAsyncError } = require('./utils/helpers')
const Users = require('./components/users/model');
const { validateBody, ensureUniqueness } = require('./components/users/validators')
const { hash } = require('bcrypt');
const express = require('express');

const app = express();

app.use(express.json());
app.use(helmet());

app.post('/api/auth/users', [validateBody, ensureUniqueness], catchAsyncError(async (req, res) => {

   const inputs = req.body;

   const hashPassword = await hash(inputs.password, 11);

   const user = new Users({
      firstname: inputs.firstname,
      lastname: inputs.lastname,
      email: inputs.email,
      phone: inputs.phone,
      password: hashPassword
   });

   const result = await user.save();

   successResponse(res, 201, "Nice one, registration successful", [result.transform()]);
}));

app.use((err, req, res, next) => {
   return errorMessage(res, 500, err.toString());
});


module.exports = app;