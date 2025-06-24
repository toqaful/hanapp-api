const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueName = `pdf-${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        const err = new Error('Only PDF files are allowed');
        err.code = 'INVALID_FILE_TYPE';
        cb(err, false);
    }
};

const PDFMiddleware = multer({
    storage,
    fileFilter,
    limits: { fileSize: 1 * 1024 * 1024 } // 5MB
});

module.exports = PDFMiddleware;