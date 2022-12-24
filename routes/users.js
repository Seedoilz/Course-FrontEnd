var express = require('express');
var router = express.Router();

/* GET users listing. */
router.use('/login', require("./actions/login"));

router.use('/process_get', require("./actions/register"));

router.use('/logout', require("./actions/logout"));

module.exports = router;
