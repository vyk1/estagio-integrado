const multer = require('multer');

const path = require('path');

module.exports = {
     storage: new multer.diskStorage({
          destination: path.resolve(__dirname, '..', 'uploads'),
          filename: function (req, file, callback) {
               const extension = file.originalname.split('.').pop();
               const newName = Date.now() + `.${extension}`;

               callback(null, newName);
          }
     })
}