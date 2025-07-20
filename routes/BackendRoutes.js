const express = require('express');
const { UploadMiddleware } = require('../middlewares/UploadMiddleware');  // Import the middlewares
const UserController = require('../controllers/UserController');  // Import the user controller
const router = express.Router();

// Define route for POST /signup to handle file uploads and form data
router.post('/signup', 
    [UploadMiddleware],  // Use the middlewares here
    UserController.signupProvider  // Proceed with your signup logic after file uploads
);

module.exports = router;
