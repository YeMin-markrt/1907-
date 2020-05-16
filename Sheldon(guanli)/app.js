var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var moment = require('moment');
var session = require("express-session");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var manageRouter= require('./routes/manage');
var memberDevRouter = require('./routes/memberDev');
var memberTesRouter = require('./routes/memberTes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.locals.moment = moment;


app.use(session({
  secret: 'secret', // 对session id 相关的cookie 进行签名
  resave: true,
  saveUninitialized: true, // 是否保存未初始化的会话
  cookie: {
  maxAge: 1000 * 60 *100, // 设置 session 的有效时间，单位毫秒
  },
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/manage',manageRouter);
app.use('/memberDev',memberDevRouter);
app.use('/memberTes',memberTesRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;