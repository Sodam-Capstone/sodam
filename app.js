const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const logger = require('morgan');
const passport = require('passport');
const RedisStore = require('connect-redis')(session);
require('dotenv').config();

var indexRouter = require('./routes/index');
const passportConfig = require('./passport');
const authRouter = require('./routes/auth');
const successRouter = require('./routes/success');
const meetingRouter = require('./routes/meeting');
const awsSdkRouter = require('./routes/awsSdk');

var app = express();
passportConfig(passport);



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('port', process.env.PORT || 3000);

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave : true,
  saveUninitialized : false,
  secret : process.env.COOKIE_SECRET,
  cookie:{
    httpOnly : true,
    secure : false,
  },
  store: new RedisStore({
    host : process.env.REDIS_HOST,
    port : process.env.REDIS_PORT,
    pass : process.env.REDIS_PASSWORD,
    logErrors: true,
  }),
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/', successRouter);
app.use('/', meetingRouter);
app.use('/', awsSdkRouter);

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

app.listen(app.get('port'),()=>{
  console.log(app.get('port'),"번 포트에서 대기중입니다.");
})

module.exports = app;
