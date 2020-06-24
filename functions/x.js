const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

module.exports = {

    x: async function() {
        const client = await MongoClient.connect(process.env.DB_URL, {useUnifiedTopology: true})
        const db = client.db(process.env.DB_NAME);
        var collection = db.collection('xs');
        const res = await collection.findOne()
        client.close();

        return res
    }

}