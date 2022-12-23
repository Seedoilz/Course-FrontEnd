var express = require('express');
var router = express.Router();

/* GET users listing. */
router.use('/login', require("./actions/login"));

router.use('/process_get', require("./actions/register"));

module.exports = router;
