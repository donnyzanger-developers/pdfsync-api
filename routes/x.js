var express = require('express');
var router = express.Router();
const webhookCheck = require('../middleware/webhookCheck')
const xx = require('../controllers/x.js');
const logger = require('heroku-logger')
require('dotenv').config();

async function x(req, res) {
    try {
        var doc = await xx.x()
        res.status(200).send()
    } catch(err) {
        logger.info(err)
        res.status(500).send()
    }
}

async function y(req, res) {
    try {
        res.status(200).send()
    } catch(err) {
        logger.info(err)
        res.status(500).send()
    }
}

router.post('/x', webhookCheck.checkAccess, x);
router.post('/y', webhookCheck.checkAccess, y);

module.exports = router;