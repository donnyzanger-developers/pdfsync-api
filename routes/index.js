var express = require('express');
var router = express.Router();
const xRoutes = require("./x")

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.use("/api/v1/x", xRoutes)

module.exports = router;
