const express = require('express');
const app = express();
const ejs = require('ejs');
const crypto = require('crypto');
const bodyParser = require('body-parser');
var session = require('express-session');

app.set("views", __dirname + "/views");
app.set('view engine', 'ejs');
app.engine('html',ejs.__express);
app.set('view engine','html');
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));
app.listen(3001, () => {
  console.log('Please visit: http://localhost:3001');
});

app.use(session({
  name: 'homework',
  secret: 'Czy026110',
  resave: true,
  saveUninitialized: false,
  cookie: {maxAge: 86400000, httpOnly: true}
}));

//页面初始化
app.use(express.static('public'))
var indexRouter = require('./routes/index');
app.use('/', indexRouter);
var usersRouter = require('./routes/users');
app.use('/', usersRouter);

module.exports = app;