const multer = require('multer');
const path = require('path');

// Set up multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Set upload destination to 'uploads' folder
    },
    filename: (req, file, cb) => {
        // Generate a unique file name to prevent overwriting files
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
        cb(null, uniqueName);  // Use the unique name for the file
    }
});

// File filter for allowed image types (JPEG/JPG and PNG)
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);  // Accept file
    } else {
        const err = new Error('Invalid file type');
        err.code = 'INVALID_FILE_TYPE';
        cb(err, false);  // Reject file
    }
};

// Set file size limit (2MB)
const UploadConfig = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 2 * 1024 * 1024 }  // 2MB max file size
});

module.exports = UploadConfig;
