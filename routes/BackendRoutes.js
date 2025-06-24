const express = require('express');

const UserMiddleware = require('../middlewares/UserMiddleware');
const UploadPDF = require('../middlewares/PDFUploadHandler');

const AuthController = require('../controllers/AuthController');
const CertTemplateController = require('../controllers/CertTemplateController');
const UploaderController = require('../controllers/UploaderController');

const router = express.Router();

router.post('/authenticated', UserMiddleware, AuthController.authenticated);
router.post('/upload/certificate/template', UploadPDF, CertTemplateController.createCertificateTemplate);
router.post('/uploader', UploaderController.addUploader);

module.exports = router;
