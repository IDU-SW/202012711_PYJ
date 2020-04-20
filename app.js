const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: false }));

const taskRouter = require('./router/taskRouter');
app.use(taskRouter);

module.exports = app;

