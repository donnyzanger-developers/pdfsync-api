var express = require('express');
var router = express.Router();
const pdfRoutes = require("./pdf")

router.use("/api/v1/pdf", pdfRoutes)

module.exports = router;
