const express = require('express');
let connection = require('./sql');

let router = express.Router();

router.get('/',function (req,res) {
    if(req.session.account===undefined){
        res.send("<script>alert('即将跳转到登陆页面！');location.href='/';</script>");
        return;
    }
    req.session.destroy(() => {
        res.send("<script>alert('退出登陆成功！');location.href='/';</script>");
      });
})

module.exports = router;