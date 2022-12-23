const express = require('express');
const app = express();
const ejs = require('ejs');
var session = require('express-session');

app.set("views", __dirname + "/views");
app.set('view engine', 'ejs');
app.engine('html',ejs.__express);
app.set('view engine','html');

app.use(express.static('public'));

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
app.use(express.static('public'))
app.get('/', function (req, res) {
  res.render('login');
})
app.get('/homepage', function (req, res) {
  res.render('homepage',{userinfo:req.app.locals['userinfo']});
})
app.get('/register', function (req, res) {
  res.render('register');
})
app.get('/subpages/svgPage', function (req, res) {
  res.render('subpages/svgPage');
})
app.get('/subpages/fttPage', function (req, res) {
  res.render('subpages/fttPage');
})
app.get('/subpages/subpage1', function (req, res) {
  res.render('subpages/subpage1');
})
app.get('/subpages/subpage2', function (req, res) {
  res.render('subpages/subpage2');
})
app.get('/subpages/subpage3', function (req, res) {
  res.render('subpages/subpage3');
})
app.get('/subpages/subpage4', function (req, res) {
  res.render('subpages/subpage1');
})
app.get('/subpages/subpage5', function (req, res) {
  res.render('subpages/subpage1');
})
app.get('/subpages/subpage6', function (req, res) {
  res.render('subpages/subpage1');
})
app.get('/subpages/subpage7', function (req, res) {
  res.render('subpages/subpage1');
})
app.get('/subpages/subpage8', function (req, res) {
  res.render('subpages/subpage1');
})
app.get('/subpages/subpage9', function (req, res) {
  res.render('subpages/subpage9');
})
app.get('/subpages/subpage10', function (req, res) {
  res.render('subpages/subpage10');
})

const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Czy026110',
  database: 'homework'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database: ' + err.stack);
    return;
  }
  console.log('Connected to database as id ' + connection.threadId);
});

app.get('/login',function (req,res) {
  var response = {
     "account":req.query.account,
     "password":req.query.password,
 };
 var selectSQL = "select email,password from userinfo where email = '"+req.query.account+"' and password = '"+req.query.password+"'";
 //var selectSQL = "select password from user where account='"+req.query.account+"'";
 var  addSqlParams = [req.query.account,req.query.password];
    connection.query(selectSQL,function (err, result) {
      if(err){
       console.log('[login ERROR] - ',err.message);
       return;
      }
      //console.log(result);
      if(result=='')
      {
          console.log("帐号密码错误");
          res.send("<script>alert('帐号密码错误');location.href='/';</script>");
      }
      else
      {   

          console.log("OK");
          req.app.locals['userinfo'] = req.query.account;
          console.log(req.app.locals['userinfo']);
          res.redirect("homepage");
      }
});
 console.log(response);
 //res.end(JSON.stringify(response));
})