const express = require('express');

const UserMiddleware = require('../middlewares/UserMiddleware');
const UploaderMiddleware = require('../middlewares/UploaderMiddleware');
const UploaderGETMiddleware = require('../middlewares/UploaderGETMiddleware');
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

// http://localhost:3500/api/generate/certificate/setup/single?certID=3&firstname=Toqaful&lastname=Herrera&y=305&fontSize=30&color=%23000000&weight=bold&textCase=upper
router.get('/generate/certificate/setup/single', UploaderGETMiddleware, CertificatesController.generateOneCertificate);

// const names = encodeURIComponent(JSON.stringify([
//     { firstname: 'Toqaful', lastname: 'Herrera' },
//     { firstname: 'Ahmad', lastname: 'Yousef' }
// ]));
// const url = `http://localhost:3500/api/generate/certificate/setup?names=${names}`;
// http://localhost:3500/api/generate/certificate/setup/multiple?name=[{%22firstname%22:%22test%22,%22lastname%22:%22xxx%22},{%22firstname%22:%22test2%22,%22lastname%22:%2222xxx%22}]&certID=3&firstname=Toqaful&lastname=Herrera&y=305&fontSize=30&color=%23000000&weight=bold&textCase=upper
router.get('/generate/certificate/setup/multiple', UploaderGETMiddleware, CertificatesController.generateCertificate);

module.exports = router;
