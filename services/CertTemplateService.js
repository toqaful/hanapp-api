const fs = require('fs');
const CertTemplateModel = require('../models/CertTemplateModel');

class CertTemplateService {
    
    constructor (user_info = null) {
        this.user_info = user_info;
        this.cert_template_model = new CertTemplateModel();
    }

    async createCertTemplate() {

        let res = {};
        let data = {};

        data.certID = this.user_info.body.certID;
        data.certPathName = this.user_info.file.filename;
        data.uploadedByID = this.user_info.body.uploadedByID;

        let create_cert_template = await this.cert_template_model.create(data);

        if (!create_cert_template) {

            this._removeOnUpload();

            res.status = 'error';
            res.message = 'not uploaded'
            res.data = [];

            return res;
        }

        res.status = 'success';
        res.message = 'uploaded'
        res.data = [];

        return res;
    }

    async validateCertTemplateFields() {

        let res = {};

        if (!this.user_info.body || !this.user_info.body.certID || !this.user_info.body.uploadedByID || !this.user_info.file) {

            this._removeOnUpload();

            res.status = 'error';
            res.message = 'something is wrong'
            res.data = [];

            return res;
        }

        res.status = 'success';
        res.message = 'valid'
        res.data = [];

        return res;
    }

    async _removeOnUpload() {
        if (this.user_info.hasOwnProperty('file')) {
            const path = `uploads/${this.user_info.file.filename}`;
            await fs.unlink(path, (err) => {
                if (err) {
                    console.error(err)
                    return;
                }
                //file removed
            });
        }
    }
}

module.exports = CertTemplateService