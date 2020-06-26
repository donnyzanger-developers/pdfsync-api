var express = require('express');
var router = express.Router();
const webhookCheck = require('../middleware/webhookCheck')
const pdf = require('../controllers/pdf.js');
const logger = require('heroku-logger');

require('dotenv').config();

async function x(req, res) {
    try {
        var doc = await pdf.x()
        res.status(200).send()
    } catch(err) {
        logger.info(err)
        res.status(500).send()
    }
}

async function imageToPdf(req, res) {
    try {
        if (req.files.length > 0) {
            pdf.imageToPdf(req.files[0])
        }
        res.status(200).send()
    } catch(err) {
        logger.info(err)
        res.status(500).send()
    }
}

async function getPdf(req, res) {
    res.download('./users/1/files/sample.pdf')
}

async function getImage(req, res) {
    res.download('./users/1/files/te_1.jpeg')
}

async function pdfToImage(req, res) {
    try {
        await pdf.pdfToImage()
        res.status(200).send()
    } catch(err) {
        logger.info(err)
        res.status(500).send()
    }
}

router.post('/x', webhookCheck.checkAccess, x);
router.post('/image_to_pdf', webhookCheck.checkAccess, imageToPdf);
router.post('/pdf_to_image', webhookCheck.checkAccess, pdfToImage);
router.get('/get_pdf', webhookCheck.checkAccess, getPdf);
router.get('/get_image', webhookCheck.checkAccess, getImage);

module.exports = router;