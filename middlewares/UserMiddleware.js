const jwt = require("jsonwebtoken");
const AuthService = require('../services/AuthService');

const UserMiddleware = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

    if (!token) {
        return res.status(401).json({ status: 'error', message: 'access token missing' });
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        if (payload.user_role !== 'user') {
            return res.status(403).json({ status: 'error', message: 'access denied: Invalid role' });
        }

        let user_info = { Code: payload.user_code }
        const auth_service = new AuthService(user_info);
        let user_code = await auth_service.findCode();

        if (user_code.status == 'error') {
            return res.status(401).json({ status: 'error', message: 'unauthorized' });
        }

        // Save payload to request for use in controllers if needed
        req.user = payload;

        next();
    } catch (err) {
        return res.status(401).json({ status: 'error', message: 'invalid or expired token ' });
    }
};

module.exports = UserMiddleware;
