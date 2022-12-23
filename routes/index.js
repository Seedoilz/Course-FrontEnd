var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
  let rString = randomString(Math.floor(Math.random() * 5) + 5);
  req.session.salt = rString;
  res.render('login');
})
router.get('/homepage', function (req, res) {
  res.render('homepage',{userinfo:req.app.locals['userinfo']});
})
router.get('/register', function (req, res) {
  res.render('register');
})
router.get('/subpages/svgPage', function (req, res) {
  res.render('subpages/svgPage');
})
router.get('/subpages/fttPage', function (req, res) {
  res.render('subpages/fttPage');
})
router.get('/subpages/subpage1', function (req, res) {
  res.render('subpages/subpage1');
})
router.get('/subpages/subpage2', function (req, res) {
  res.render('subpages/subpage2');
})
router.get('/subpages/subpage3', function (req, res) {
  res.render('subpages/subpage3');
})
router.get('/subpages/subpage4', function (req, res) {
  res.render('subpages/subpage1');
})
router.get('/subpages/subpage5', function (req, res) {
  res.render('subpages/subpage1');
})
router.get('/subpages/subpage6', function (req, res) {
  res.render('subpages/subpage1');
})
router.get('/subpages/subpage7', function (req, res) {
  res.render('subpages/subpage1');
})
router.get('/subpages/subpage8', function (req, res) {
  res.render('subpages/subpage1');
})
router.get('/subpages/subpage9', function (req, res) {
  res.render('subpages/subpage9');
})
router.get('/subpages/subpage10', function (req, res) {
  res.render('subpages/subpage10');
})

function randomString(length) {
  let chars = '0123456789~-=[]\\;\',./abcdefghijklmnopqrstuvwxyz!@#&ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+{}|":?><';
  let result = '';
  for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

module.exports = router;
