var express = require('express');
var router = express.Router();
const webhookCheck = require('../middleware/webhookCheck')
const pdf = require('../controllers/pdf.js');
const logger = require('heroku-logger');
const functions = require('../functions/functions.js')

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
        if (req.files.length > 0 && (req.files[0].originalname.endsWith('.jpg') || req.files[0].originalname.endsWith('.jpeg'))) {
            pdf.imageToPdf(req.files[0])
        }
        res.status(200).send()
    } catch(err) {
        logger.info(err)
        res.status(500).send()
    } 
}

async function pdfToImage(req, res) {
    try {
        if (req.files.length > 0  && (req.files[0].originalname.endsWith('.pdf'))) {
            await pdf.pdfToImage(req.files[0])
        }
        res.status(200).send()
    } catch(err) {
        logger.info(err)
        res.status(500).send()
    }
}

async function getPdf(req, res) {
    await res.download('./users/1/files/sample.pdf')
    functions.deleteFile('./users/1/files/sample.pdf');
    res.status(200).send()
}

async function getImage(req, res) {
    await res.download('./users/1/files/te_1.jpeg')
    functions.deleteFile('./users/1/files/te_1.jpeg')
    res.status(200).send()
}

router.post('/x', webhookCheck.checkAccess, x);
router.post('/image_to_pdf', webhookCheck.checkAccess, imageToPdf);
router.post('/pdf_to_image', webhookCheck.checkAccess, pdfToImage);
router.get('/get_pdf', webhookCheck.checkAccess, getPdf);
router.get('/get_image', webhookCheck.checkAccess, getImage);

module.exports = router;