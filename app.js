const express = require('express');
const app = express();
const ejs = require('ejs');
const crypto = require('crypto');
var session = require('express-session');

app.set("views", __dirname + "/views");
app.set('view engine', 'ejs');
app.engine('html',ejs.__express);
app.set('view engine','html');

app.use(express.static('public'));

app.listen(3000, () => {
  console.log('Please visit: http://localhost:3000');
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
  console.log('Connected to database successfully.');
});

//登陆模块
app.get('/login',function (req,res) {
  var response = {
     "account":req.query.account,
     "password":req.query.password,
 };
 var pwd = req.query.password;
 let selectSQL = 'SELECT * FROM `userinfo` WHERE email = (?)';
 //var selectSQL = "select password from user where account='"+req.query.account+"'";
 var  addSqlParams = [req.query.account,req.query.password];
    connection.query(selectSQL,req.query.account,function (err, result) {
      if(err){
       res.send("<script>alert('没有此账号');location.href='/';</script>");
       console.log('[login ERROR] - ',err.message);
       return;
      }
      let user = JSON.parse(JSON.stringify(result));
      user = user[0];
      password = crypto.createHmac("sha256", user.salt).update(pwd).digest('hex');
      if (password === user.password) {
        console.log("OK");
        req.app.locals['userinfo'] = req.query.account;
        console.log(req.app.locals['userinfo']);
        res.redirect("homepage");
      } else {
        console.log("帐号密码错误");
        res.send("<script>alert('帐号密码错误');location.href='/';</script>");
      }
      //console.log(result);
});
 console.log(response);
 //res.end(JSON.stringify(response));
})

//注册模块
var  addSql = 'INSERT INTO userinfo(email,password,usrname,name,mobile,salt) VALUES(?,?,?,?,?,?)';
app.get('/process_get', function (req, res) {
  var response = {
    "account":req.query.email,
    "password":req.query.password,
};
   let salt = randomString(Math.floor(Math.random()*5)+15);
   let hmac = crypto.createHmac("sha256",salt);
   let password = hmac.update(req.query.password).digest('hex');
   var  addSqlParams = [req.query.email,password,req.query.username,req.query.rename,req.query.Telphone,salt];
   console.log(salt);
   console.log(password);
   console.log(req.query.email);
   connection.query(addSql,addSqlParams,function (err, result) {
        if(err){
         res.send("<script>alert('邮箱重复 请重新注册');location.href='/register';</script>");
         return;
        }
        res.send("<script>alert('注册成功');location.href='/';</script>");
        return;
});
console.log(response);
})

//utils
function randomString(length) {
  let chars = '0123456789~-=[]\\;\',./abcdefghijklmnopqrstuvwxyz!@#&ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+{}|":?><';
  let result = '';
  for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}