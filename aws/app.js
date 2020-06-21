const express = require('express');
const bodyParser = require('body-parser');
const AWS = require('aws-sdk');

const app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('views'));

const uploadRouter = require('./router/uploadRouter');
app.use(uploadRouter);

module.exports = app;