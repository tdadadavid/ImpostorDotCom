"use strict";

const errorHandler = require('./middlewares/errorHandler')
const v1Router = require('./components/v1');
const helmet = require('helmet');

const express = require('express');
const app = express();

app.use(express.json());
app.use(helmet());
app.use(v1Router);


app.use('*', (req, res, next) => {
   next( new Error(`Route not found ${req.url}`));
});

app.use(errorHandler);

module.exports = app;