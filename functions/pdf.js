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
        fs.writeFileSync(`./users/1/files/${file.originalname}`, file.buffer, 'binary');
        
        const res = await imagesToPdf([`users/1/files/${file.originalname}`], "users/1/files/sample.pdf");

        return res;
    }, 

    pdfToImage: async function(file) {
        var res = {}
        try {
            fs.writeFileSync(`./users/1/files/${file.originalname}`, file.buffer, 'binary'); // write jpg to disk with this filename
            const pdf2pic = new PDF2Pic({
                // density: 100, // output pixels per inch
                savename: "", // output file name
                savedir: "./users/1/files", // output file location
                format: "jpeg", 
                // size: "600x600" // output size in pixels
            });
            res = await pdf2pic.convert(`./users/1/files/${file.originalname}`) // jpg to convert
        } catch (err) {
            console.log(err);
        }

        return res;
    }

}