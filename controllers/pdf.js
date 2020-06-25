// const uuidv4 = require('uuid/v4');
const logger = require('heroku-logger')
const pdf = require('../functions/pdf')

module.exports = { 

    x: async function(req) {
        const res = await pdf.x()

        return res 
    },

    imageToPdf: async function(file) {
        const res = await pdf.imageToPdf(file)

        return res
    },

    pdfToImage: async function() {
        const res = await pdf.pdfToImage()

        return
    }

}