const PDFMiddleware = require('./PDFMiddleware');
const multer = require('multer');

const uploadPDF = (req, res, next) => {
    PDFMiddleware.single('certTemplate')(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({
                status: 'error',
                message: err.code === 'LIMIT_FILE_SIZE'
                    ? 'PDF file too large.'
                    : 'Something is wrong',
                data: []
            });
        } else if (err) {
            return res.status(400).json({
                status: 'error',
                message: err.code === 'INVALID_FILE_TYPE'
                    ? 'Only PDF files are allowed'
                    : 'Something is wrong',
                data: []
            });
        }

        // Success or no error
        next();
    });
};

module.exports = uploadPDF;
