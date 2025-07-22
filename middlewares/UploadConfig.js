// const multer = require('multer');
// const path = require('path');

// // Set up multer storage
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/'); // Set upload destination to 'uploads' folder
//     },
//     filename: (req, file, cb) => {
//         // Generate a unique file name to prevent overwriting files
//         const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
//         cb(null, uniqueName);  // Use the unique name for the file
//     }
// });

// // File filter for allowed image types (JPEG/JPG and PNG)
// const fileFilter = (req, file, cb) => {
//     if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//         cb(null, true);  // Accept file
//     } else {
//         const err = new Error('Invalid file type');
//         err.code = 'INVALID_FILE_TYPE';
//         cb(err, false);  // Reject file
//     }
// };

// // Set file size limit (2MB)
// const UploadConfig = multer({
//     storage: storage,
//     fileFilter: fileFilter,
//     limits: { fileSize: 2 * 1024 * 1024 }  // 2MB max file size
// });

// module.exports = UploadConfig;


const multer = require('multer');
const path = require('path');
const fs = require('fs');

const savedFiles = []; // 🔥 Track uploaded files manually

const storage = multer.diskStorage({
    destination: async function (req, file, cb) {
        const uploadPath = await path.join('uploads'); // adjust as needed
        if (await !fs.existsSync(uploadPath)) await fs.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
    },
    filename: async function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = await path.extname(file.originalname);
        const fileName = `${file.fieldname}-${uniqueSuffix}${ext}`;
        await savedFiles.push(path.join('uploads', fileName)); // 👈 Track full path
        cb(null, fileName);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        const err = new Error('INVALID_FILE_TYPE');
        err.code = 'INVALID_FILE_TYPE';
        cb(err);
    }
};

const UploadConfig = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 2 * 1024 * 1024 } // 2MB
});

module.exports = {
    UploadConfig,
    savedFiles // 👈 expose the tracked files
};
