"use strict";

const userRouter = require('./Users/routes');

const { Router } = require('express');

const router = Router();

router.use('/v1/api/auth/users', userRouter);


module.exports = router;


