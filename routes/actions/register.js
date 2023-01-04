const express = require('express');
let connection = require('./sql');
const crypto = require('crypto');

let router = express.Router();

//注册模块
var  addSql = 'INSERT INTO userinfo(email,password,usrname,name,mobile,salt) VALUES(?,?,?,?,?,?)';
router.post('/', function (req, res) {
  var response = {
    "account":req.body.email,
    "password":req.body.password,
};
   let salt = randomString(Math.floor(Math.random()*5)+15);
   let hmac = crypto.createHmac("sha256",salt);
   let password = hmac.update(req.body.password).digest('hex');
   var  addSqlParams = [req.body.email,password,req.body.username,req.body.rename,req.body.Telphone,salt];
   console.log(salt);
   console.log(password);
   console.log(req.body.email);
   connection.query(addSql,addSqlParams,function (err, result) {
        if(err){
         res.send("<script>alert('邮箱重复 请重新注册');location.href='/register';</script>");
         return;
        }
        req.session.destroy(() => {
          res.send("<script>alert('注册成功');location.href='/';</script>");
        });
        return;
});
console.log(response);
})

function randomString(length) {
    let chars = '0123456789~-=[]\\;\',./abcdefghijklmnopqrstuvwxyz!@#&ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+{}|":?><';
    let result = '';
    for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }

module.exports = router;