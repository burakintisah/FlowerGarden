var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql2');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var signupRouter = require('./routes/signup');
var provinceRouter = require('./routes/province');
var districtRouter = require('./routes/district');
var arrangementRouter = require('./routes/arrangement');
var commentRouter = require('./routes/comment');
var accountRouter = require('./routes/account');
var ratingRouter = require('./routes/rating');
var orderRouter = require('./routes/order');
var flowerRouter = require('./routes/flower');
var complaintRouter = require('./routes/complaint');


var app = express();

global.dbconnection = mysql.createConnection({
  host      : "127.0.0.1",
  user      : "root",
  password  : "password",
  database  : "flowergarden"
});

dbconnection.connect(function(err){
  if(err) {
    console.log('Database not connected.');

    throw err;
  }
  else
    console.log('Database connected.');
});

global.sendResponse = function sendResponse(res, status, message, data){
  res.json({ status: status, message: message, data: data});
};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(bodyParser.json());

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/province', provinceRouter);
app.use('/district', districtRouter);
app.use('/arrangement', arrangementRouter);
app.use('/comment', commentRouter);
app.use('/account', accountRouter);
app.use('/rating', ratingRouter);
app.use('/order', orderRouter);
app.use('/flower', flowerRouter);
app.use('/complaint', complaintRouter);


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
