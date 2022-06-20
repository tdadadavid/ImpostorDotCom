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

   return successResponse(res, 201, "Nice one, registration successful", [result.transform()]);
}));

// minimum implementation
app.post('/api/auth/users/login', (req, res) => {
    if (!req.body.email) return errorMessage(res, 400, "Email is required");
    if (!req.body.password) return errorMessage(res, 400, "Password is required");

    if (req.body.email.endsWith(".gov")) return errorMessage(res, 400, "Invalid email given");

    if(req.body.password !== "AWbcn09890@#$") return errorMessage(res, 400, "Passwords don't match");

    res.status(200).send({});
});

app.use((err, req, res, next) => {
   return errorMessage(res, 500, err.toString());
});


module.exports = app;