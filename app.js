const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();
console.log(process.env.DB_HOST);

const indexRouter = require('./routes/web');
const movieRouter = require('./routes/api/movie/MovieRouter');
const authRouter = require('./routes/api/auth/AuthRouter');

const app = express();
//views를 요청하면 /public으로 연결하겠다
app.set('views', __dirname + '/public');
//엔진은 ejs를 쓰되 html로 하겠다.
app.engine('html', require('ejs').renderFile);
//뷰 엔진은 html로
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/movie', movieRouter);
app.use('/api/auth', authRouter);

module.exports = app;
