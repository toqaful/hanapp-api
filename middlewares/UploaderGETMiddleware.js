const jwt = require("jsonwebtoken");
const AuthService = require('../services/AuthService');
const UploaderService = require('../services/UploaderService');

const UploaderGETMiddleware = async (req, res, next) => {
    
    const {
        token
    } = req.query;


    if (!token) {
        return res.status(401).json({ status: 'error', message: 'access token missing' });
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        if (payload.user_role !== 'user') {
            return res.status(403).json({ status: 'error', message: 'access denied: Invalid role' });
        }

        if (payload.is_uploader === false) {
            return res.status(403).json({ status: 'error', message: 'access denied: Invalid role' });
        }

        let user_info = { Code: payload.user_code }
        const auth_service = new AuthService(user_info);
        let user_code = await auth_service.findCode();

        if (user_code.status == 'error') {
            return res.status(401).json({ status: 'error', message: 'unauthorized' });
        }

        const uploader_service = new UploaderService();
        let uploader = await uploader_service.getOneUploaderByID(payload.user_code);

        if (uploader.status == 'error') {
            return res.status(401).json({ status: 'error', message: 'unauthorized' });
        }

        if (uploader.data.isDisabled == 1) {
            return res.status(401).json({ status: 'error', message: 'unauthorized' });
        }

        // Save payload to request for use in controllers if needed
        req.user = payload;

        next();
    } catch (err) {
        return res.status(401).json({ status: 'error', message: 'invalid or expired token ' });
    }
};

module.exports = UploaderGETMiddleware;
