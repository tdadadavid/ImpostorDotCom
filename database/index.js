const mongoose = require('mongoose');
const { db } = require('../config')


mongoose.connect('mongo://localhost/users_test')
.then(() => console.log("Database connection established"));