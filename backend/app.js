const cookieParser = require('cookie-parser');
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const path = require('path');
const storeRouter = require('./routes/store');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/store', storeRouter);

module.exports = app;
