const multer = require('multer');
const UploadConfig = require('./UploadConfig');

const UploadMiddleware = (req, res, next) => {
    UploadConfig.fields([
        { name: 'gov', maxCount: 1 },
        { name: 'pic', maxCount: 1 }
    ])(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({
                status: 'error',
                message: err.code === 'LIMIT_FILE_SIZE' ? 'File too large.' : err.message,
                data: []
            });
        } else if (err) {
            return res.status(400).json({
                status: 'error',
                message: err.code === 'INVALID_FILE_TYPE'
                    ? 'Only JPEG/JPG & PNG files are allowed.'
                    : err.message,
                data: []
            });
        }
        next();
    });
};

module.exports = {
    UploadMiddleware
};
