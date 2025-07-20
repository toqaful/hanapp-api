const CertTemplateService = require('../services/CertTemplateService');

module.exports = {
    createCertificateTemplate: async (req, res) => {

        const cert_template_service = new CertTemplateService(req);

        let validate_cert_template = await cert_template_service.validateCertTemplateFields();

        if (validate_cert_template.status == 'error') {
            return res.status(400).json(validate_cert_template);
        }

        let create_cert_template = await cert_template_service.createCertTemplate();

        if (create_cert_template.status == 'error') {
            return res.status(400).json(create_cert_template);
        }

        return res.status(200).json(create_cert_template);
    },
};
