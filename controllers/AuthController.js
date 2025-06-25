const AuthService = require('../services/AuthService');

module.exports = {
    authToken: async (req, res) => {

        const auth_service = new AuthService(req);

        let validate_email = await auth_service.validateEmail();

        if (validate_email.status == 'error') {
            return res.status(401).json(validate_email);
        }

        let data = await auth_service.generateToken(validate_email.data);

        return res.redirect(`/oauth-success?token=${data.data}`);
    },

    getUserInfo: async (req, res) => {

        const token = req.headers.authorization && req.headers.authorization.split(" ")[1];

        let auth_service = new AuthService({});

        let validate_token = await auth_service.validateToken(token)

        if (validate_token.status == 'error') {
            return res.status(401).json(validate_token);
        }

        auth_service.usern_info = {
            user: {
                emails: [
                    { value: validate_token.data.email }
                ]
            }
        };

        let validate_email = await auth_service.validateEmail();

        if (validate_email.status == 'error') {
            return res.status(401).json(validate_email);
        }

        validate_email.data.display_name = validate_token.data.display_name;

        return res.status(200).json(validate_email.data);
    },

    authenticated: async (req, res) => {

        authenticated = { status: 'success', message: '', data: req.user };

        return res.status(200).json(authenticated);
    },
};
