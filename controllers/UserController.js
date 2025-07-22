const UserService = require('../services/UserService');

module.exports = {
    signupProvider: async (req, res) => {

        const user_service = new UserService(req);

        let validate_fields = await user_service.validateFieldsProvider();

        if (validate_fields.status == 'error') {
            return res.status(400).json(validate_fields);
        }

        let create_user = await user_service.createUserProvider();

        if (create_user.status == 'error') {
            return res.status(400).json(create_user);
        }

        return res.status(200).json(create_user);
    },

    signupClient: async (req, res) => {

        const user_service = new UserService(req);

        let validate_fields = await user_service.validateFieldsClient();

        if (validate_fields.status == 'error') {
            return res.status(400).json(validate_fields);
        }

        let create_user = await user_service.createUserClient();

        if (create_user.status == 'error') {
            return res.status(400).json(create_user);
        }

        return res.status(200).json(create_user);
    },
};
