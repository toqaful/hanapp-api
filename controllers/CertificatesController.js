const CertificatesService = require('../services/CertificatesService');

module.exports = {
    createCertificate: async (req, res) => {

        const certificate_service = new CertificatesService(req);

        let validate_certificate = await certificate_service.validateCertificate();

        if (validate_certificate.status == 'error') {
            return res.status(400).json(validate_certificate);
        }

        let add_certificate = await certificate_service.addCertificate();

        if (add_certificate.status == 'error') {
            return res.status(400).json(add_certificate);
        }

        return res.status(200).json(add_certificate);
    },

    generateOneCertificate: async (req, res) => {

        const certificate_service = new CertificatesService(req);

        let generate_one_certificate = await certificate_service.generateOneCertificate();

        if (generate_one_certificate.status == 'error') {
            return res.status(400).json(generate_one_certificate);
        }

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline; filename=certificate.pdf');
        res.setHeader('Content-Length', generate_one_certificate.data.length);
        return res.send(Buffer.from(generate_one_certificate.data));
    },

    generateCertificate: async (req, res) => {

        const certificate_service = new CertificatesService(req);

        let generate_certificate = await certificate_service.generateCertificate();

        if (generate_certificate.status == 'error') {
            return res.status(400).json(generate_certificate);
        }

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline; filename=certificate.pdf');
        res.setHeader('Content-Length', generate_certificate.data.length);
        return res.send(Buffer.from(generate_certificate.data));
    },
};
