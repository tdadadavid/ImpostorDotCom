const UserController = require('../controllers')
const { Router } = require('express');
const {validateBody, ensureUniqueness, validateRequest, validateUser} = require("../validators");

const userRouter = Router();


userRouter.post('/', [validateBody, ensureUniqueness], UserController.signUp)
userRouter.post('/login', [validateRequest, validateUser], UserController.login);


module.exports = userRouter;