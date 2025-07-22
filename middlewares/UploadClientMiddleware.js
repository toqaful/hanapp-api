// const fs = require('fs');
// const path = require('path');
// const multer = require('multer');
// const UploadConfig = require('./UploadConfig');

// const UploadClientMiddleware = (req, res,  next) => {
//     UploadConfig.fields([
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
//     UploadClientMiddleware
// };

const fs = require('fs');
const multer = require('multer');
const { UploadConfig, savedFiles } = require('./UploadConfig');

const UploadClientMiddleware = async (req, res, next) => {
    const uploader = UploadConfig.fields([
        { name: 'pic', maxCount: 1 }
    ]);

    uploader(req, res, async function (err) {
        // 🧹 Clean up manually tracked files
        const cleanupFiles = async () => {
            if (savedFiles.length > 0) {
                await savedFiles.forEach(async filePath => {
                    fs.unlink(filePath, (unlinkErr) => {
                        if (unlinkErr) {
                            console.error('⚠️ Failed to delete:', filePath);
                        }
                    });
                });
                savedFiles.length = 0; // reset
                // console.log(savedFiles)
            }
        };

        if (err instanceof multer.MulterError || err) {
            await cleanupFiles();
            return res.status(400).json({
                status: 'error',
                message: err.code === 'LIMIT_UNEXPECTED_FILE'
                    ? 'Unexpected field'
                    : err.message,
                data: []
            });
        }

        // reset saved files to avoid memory leak
        savedFiles.length = 0;

        // console.log(savedFiles)
        next();
    });
};

module.exports = {
    UploadClientMiddleware
};
