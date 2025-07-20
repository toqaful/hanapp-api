const express = require('express');
const passport = require('passport');
const AuthController = require('../controllers/AuthController');

const router = express.Router();

router.get('/google', passport.authenticate("google", { scope: ["profile", "email"] }));

router.get('/google/callback',
    passport.authenticate("google", { session: false, failureRedirect: "/auth/failure" }),
    AuthController.authToken
);

router.get('/failure', (req, res) => {
    res.status(401).json({ message: "Authentication Failed" });
});

module.exports = router;
