const UploaderService = require('../services/UploaderService');

module.exports = {
    addUploader: async (req, res) => {

        const uploader_service = new UploaderService(req);

        let validate_uploader = await uploader_service.validateUploader();

        if (validate_uploader.status == 'error') {
            return res.status(400).json(validate_uploader);
        }

        let add_uploader = await uploader_service.addUploader();

        if (add_uploader.status == 'error') {
            return res.status(400).json(add_uploader);
        }

        return res.status(200).json(add_uploader);
    },
};
