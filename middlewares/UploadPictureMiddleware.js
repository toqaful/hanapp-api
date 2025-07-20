const UploadConfig = require('./UploadConfig');
const multer = require('multer');

const UploadPictureMiddleware = (req, res, next) => {
    UploadConfig.single('picture')(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({
                status: 'error',
                message: err.code === 'LIMIT_FILE_SIZE'
                    ? 'file too large.'
                    : 'Something is wrong1',
                data: []
            });
        } else if (err) {
            return res.status(400).json({
                status: 'error',
                message: err.code === 'INVALID_FILE_TYPE'
                    ? 'Only files are allowed'
                    : 'Something is wrong1',
                data: []
            });
        }

        // Success or no error
        next();
    });
};

module.exports = UploadPictureMiddleware;
