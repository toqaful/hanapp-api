const express = require('express');

const UserMiddleware = require('../middlewares/UserMiddleware');
const UploaderMiddleware = require('../middlewares/UploaderMiddleware');
const UploadPDF = require('../middlewares/PDFUploadHandler');

const AuthController = require('../controllers/AuthController');
const CertificatesController = require('../controllers/CertificatesController');
const CertTemplateController = require('../controllers/CertTemplateController');
const UploaderController = require('../controllers/UploaderController');

const router = express.Router();

router.post('/authenticated', UserMiddleware, AuthController.authenticated);
router.post('/uploader', UploaderMiddleware, UploaderController.addUploader);

router.post('/certificate', UploaderMiddleware, CertificatesController.createCertificate);
router.post('/upload/certificate/template', [UploaderMiddleware, UploadPDF], CertTemplateController.createCertificateTemplate);

router.get('/generate/certificate/setup', CertificatesController.generateOneCertificate);
// http://localhost:3500/api/generate/certificate/setup?firstname=Toqaful&lastname=Herrera&y=130&fontSize=30&color=%23000000&weight=bold&textCase=upper

module.exports = router;
