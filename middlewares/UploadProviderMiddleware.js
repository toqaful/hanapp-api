// const multer = require('multer');
// const UploadConfig = require('./UploadConfig');

// const UploadProviderMiddleware = (req, res, next) => {
//     UploadConfig.fields([
//         { name: 'gov', maxCount: 1 },
//         { name: 'pic', maxCount: 1 }
//     ])(req, res, function (err) {
//         if (err instanceof multer.MulterError) {
//             return res.status(400).json({
//                 status: 'error',
//                 message: err.code === 'LIMIT_FILE_SIZE' ? 'File too large.' : err.message,
//                 data: []
//             });
//         } else if (err) {
//             return res.status(400).json({
//                 status: 'error',
//                 message: err.code === 'INVALID_FILE_TYPE'
//                     ? 'Only JPEG/JPG & PNG files are allowed.'
//                     : err.message,
//                 data: []
//             });
//         }
//         next();
//     });
// };

// module.exports = {
//     UploadProviderMiddleware
// };


// const fs = require('fs');
const multer = require('multer');
const fs = require('fs');
const { UploadConfig, savedFiles } = require('./UploadConfig');

const UploadProviderMiddleware = (req, res, next) => {
    const uploader = UploadConfig.fields([
        { name: 'gov', maxCount: 1 },
        { name: 'pic', maxCount: 1 }
    ]);

    uploader(req, res, function (err) {

        const cleanupFiles = () => {
            if (savedFiles.length > 0) {
                savedFiles.forEach(filePath => {
                    fs.unlink(filePath, (unlinkErr) => {
                        if (unlinkErr) {
                            console.error('⚠️ Failed to delete:', filePath);
                        }
                    });
                });
                savedFiles.length = 0;
            }
        };

        if (err instanceof multer.MulterError || err) {
            cleanupFiles();
            return res.status(400).json({
                status: 'error',
                message: err.code === 'LIMIT_UNEXPECTED_FILE'
                    ? 'Unexpected field'
                    : err.message,
                data: []
            });
        }

        savedFiles.length = 0;
        next();
    });
};

module.exports = {
    UploadProviderMiddleware
};
