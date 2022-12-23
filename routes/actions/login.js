const express = require('express');
let connection = require('./sql');
const crypto = require('crypto');

let router = express.Router();
//登陆模块
router.get('/',function (req,res) {
    var response = {
       "account":req.query.account,
       "password":req.query.password,
   };
   var pwd = req.query.password;
   let salt = req.query.salt;
   console.log(salt);
   let front_salt = req.session.salt;
   console.log(front_salt);
    // if (!front_salt || pwd.length < 6) {
    //     res.send('{"code":"-1"}');
    //     return;
    // }
  req.session.salt = null;
  
  // pwd = new Buffer.from(pwd, 'base64').toString();
  // if (pwd.substring(pwd.length - front_salt.length) !== front_salt) {
  //     res.send('{"code":"-1"}');
  //     return;
  // }
  // pwd = pwd.substring(0, pwd.length - front_salt.length);
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

  module.exports = router;

