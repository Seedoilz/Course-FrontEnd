var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
  let rString = randomString(Math.floor(Math.random() * 5) + 5);
  req.session.salt = rString;
  res.render('login',{salt:rString});
  req.session.account = undefined;
})
router.get('/homepage', function (req, res) {
  // res.render('homepage',{userinfo:req.app.locals['userinfo']});
  console.log(req.session.account);
  if(req.session.account===undefined){
    res.render('homepage',{userinfo:"未登陆，访客状态"});
  }
  else{
    res.render('homepage',{userinfo:req.session.account});
  }
})
router.get('/register', function (req, res) {
  res.render('register');
})
router.get('/subpages/svgPage', function (req, res) {
  if(req.session.account===undefined){
    res.render('subpages/svgPage',{userinfo:"未登陆，访客状态"});
  }
  else{
    res.render('subpages/svgPage',{userinfo:req.session.account});
  }
})
router.get('/subpages/fttPage', function (req, res) {
  if(req.session.account===undefined){
    res.render('subpages/fttPage',{userinfo:"未登陆，访客状态"});
  }
  else{
    res.render('subpages/fttPage',{userinfo:req.session.account});
  }
})
router.get('/subpages/subpage1', function (req, res) {
  if(req.session.account===undefined){
    res.render('subpages/subpage1',{userinfo:"未登陆，访客状态"});
  }
  else{
    res.render('subpages/subpage1',{userinfo:req.session.account});
  }
})
router.get('/subpages/subpage2', function (req, res) {
  if(req.session.account===undefined){
    res.render('subpages/subpage2',{userinfo:"未登陆，访客状态"});
  }
  else{
    res.render('subpages/subpage2',{userinfo:req.session.account});
  }
})
router.get('/subpages/subpage3', function (req, res) {
  if(req.session.account===undefined){
    res.render('subpages/subpage3',{userinfo:"未登陆，访客状态"});
  }
  else{
    res.render('subpages/subpage3',{userinfo:req.session.account});
  }
})
router.get('/subpages/subpage4', function (req, res) {
  if(req.session.account===undefined){
    res.render('subpages/subpage4',{userinfo:"未登陆，访客状态"});
  }
  else{
    res.render('subpages/subpage4',{userinfo:req.session.account});
  }
})
router.get('/subpages/subpage5', function (req, res) {
  if(req.session.account===undefined){
    res.render('subpages/subpage5',{userinfo:"未登陆，访客状态"});
  }
  else{
    res.render('subpages/subpage5',{userinfo:req.session.account});
  }
})
router.get('/subpages/subpage6', function (req, res) {
  if(req.session.account===undefined){
    res.render('subpages/subpage6',{userinfo:"未登陆，访客状态"});
  }
  else{
    res.render('subpages/subpage6',{userinfo:req.session.account});
  }
})
router.get('/subpages/subpage7', function (req, res) {
  if(req.session.account===undefined){
    res.render('subpages/subpage7',{userinfo:"未登陆，访客状态"});
  }
  else{
    res.render('subpages/subpage7',{userinfo:req.session.account});
  }
})
router.get('/subpages/subpage8', function (req, res) {
  if(req.session.account===undefined){
    res.render('subpages/subpage8',{userinfo:"未登陆，访客状态"});
  }
  else{
    res.render('subpages/subpage8',{userinfo:req.session.account});
  }
})
router.get('/subpages/subpage9', function (req, res) {
  if(req.session.account===undefined){
    res.render('subpages/subpage9',{userinfo:"未登陆，访客状态"});
  }
  else{
    res.render('subpages/subpage9',{userinfo:req.session.account});
  }
})
router.get('/subpages/subpage10', function (req, res) {
  if(req.session.account===undefined){
    res.render('subpages/subpage10',{userinfo:"未登陆，访客状态"});
  }
  else{
    res.render('subpages/subpage10',{userinfo:req.session.account});
  }
})

function randomString(length) {
  let chars = '0123456789~-=[]\\;\',./abcdefghijklmnopqrstuvwxyz!@#&ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+{}|":?><';
  let result = '';
  for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

module.exports = router;
