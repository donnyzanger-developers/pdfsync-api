const MongoClient = require('mongodb').MongoClient;
const imagesToPdf = require("images-to-pdf");
const PDF2Pic = require("pdf2pic");
const fs = require('fs');

require('dotenv').config();

module.exports = {

    x: async function() {
        const client = await MongoClient.connect(process.env.DB_URL, {useUnifiedTopology: true})
        const db = client.db(process.env.DB_NAME);
        var collection = db.collection('xs');
        const res = await collection.findOne()
        client.close();

        return res
    }, 

    imageToPdf: async function(file) {
        // save the file
        fs.writeFileSync(`./users/1/files/${file.originalname}`, file.buffer, 'binary');
        // fs.writeFileSync(`./users/1/files/${file.originalname}`, file.buffer, 'binary');
        
        const res = await imagesToPdf([`users/1/files/${file.originalname}`], "users/1/files/sample.pdf");
        // const res = await imagesToPdf(["users/1/files/image1.jpg"], "users/1/files/sample.pdf");

        return res;
    }, 

    pdfToImage: async function() {
        var res = {}
        try {
            const pdf2pic = new PDF2Pic({
                // density: 100,           // output pixels per inch
                savename: "te",   // output file name
                savedir: "./users/1/files",    // output file location
                format: "jpeg",          // output file format
                // size: "600x600"         // output size in pixels
            });
            res = await pdf2pic.convert("./users/1/files/te.pdf")
        } catch (err) {
            console.log(err);
        }

        return res;
    }

}