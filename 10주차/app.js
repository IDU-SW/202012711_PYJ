const express = require('express');
const bodyParser = require('body-parser');

const app = express();
// 템플릿 엔진 설정(필수)
app.set('view engine', 'ejs');
// 템플릿 파일 위치 설정(필수)
app.set('views', __dirname + '/views');

//app.use(methodOverride('_method'));
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: false }));

const taskRouter = require('./router/taskRouter');
app.use(taskRouter);

module.exports = app;

