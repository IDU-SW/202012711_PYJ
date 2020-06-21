const express = require('express');
// const session = require('express-session');
const bodyParser = require('body-parser');
const AWS = require('aws-sdk');

const app = express();
// 템플릿 엔진 설정(필수)
app.set('view engine', 'ejs');
// 템플릿 파일 위치 설정(필수)
app.set('views', __dirname + '/views');

//app.use(methodOverride('_method'));
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(session({
//     resave:false,
//     saveUninitialized:false,
//     secret:'Secret Key'})
// );
app.use(express.static('views'));

const taskRouter = require('./router/uploadRouter');
app.use(taskRouter);

module.exports = app;

