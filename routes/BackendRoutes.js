const express = require('express');
const { UploadProviderMiddleware } = require('../middlewares/UploadProviderMiddleware');  // Import the middlewares
const { UploadClientMiddleware } = require('../middlewares/UploadClientMiddleware');
const ClientFileMiddleware = require('../middlewares/ClientFileMiddleware');
const UserController = require('../controllers/UserController');  // Import the user controller
const router = express.Router();

// Define route for POST /signup to handle file uploads and form data
router.post('/signup/provider', 
    [UploadProviderMiddleware],  // Use the middlewares here
    UserController.signupProvider  // Proceed with your signup logic after file uploads
);

router.post('/signup/client', 
    [UploadClientMiddleware],  // Use the middlewares here
    UserController.signupClient  // Proceed with your signup logic after file uploads
);

module.exports = router;
