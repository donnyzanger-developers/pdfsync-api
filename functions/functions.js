const fs = require('fs');

module.exports = {

    deleteFile: function(filePath) {
        try {
            const res = fs.unlinkSync(filePath)
            console.log(res);
        } catch(e) {
            console.log(e);
        }
    }

}