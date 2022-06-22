const userRouter = require('./Users/routes');

const { Router } = require('express');

const router = Router();

router.use('/api/auth/users', userRouter);


module.exports = router;


