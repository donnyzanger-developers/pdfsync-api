// const uuidv4 = require('uuid/v4');
const logger = require('heroku-logger')
const xf = require('../functions/x')

module.exports = { 

    x: async function(req) {
        const res = await xf.x()

        return res 
    },

    y: async function() {


        return
    }

}