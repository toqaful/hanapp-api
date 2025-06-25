const fs = require('fs');
const path = require('path');
const { PDFDocument, rgb } = require('pdf-lib')
const fontkit = require('fontkit');
const CertificatesModel = require('../models/CertificatesModel');

class UploaderService {
    
    constructor (user_info = null) {
        this.user_info = user_info;
        this.certificates_model = new CertificatesModel();
    }

    async addCertificate() {

        let res = {};
        let data = {};

        data.CertName = this.user_info.body.CertName;
        data.UploadedByID = this.user_info.user.user_code;

        let create_certificate = await this.certificates_model.create(data);

        if (!create_certificate) {

            res.status = 'error';
            res.message = 'not created'
            res.data = [];

            return res;
        }

        res.status = 'success';
        res.message = 'created'
        res.data = create_certificate;

        return res;
    }

    async validateCertificate() {

        let res = {};

        if (!this.user_info.body || !this.user_info.body.CertName || this.user_info.body.CertName.trim() == '') {

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

    async _hexToRgb(hex) {
        if (!hex || typeof hex !== 'string') {
            return { r: 0, g: 0, b: 0 }; // fallback to black
        }
        
        hex = hex.replace(/^#/, ''); // remove # if present
    
        if (hex.length !== 6 || !/^[0-9A-Fa-f]{6}$/.test(hex)) {
            return { r: 0, g: 0, b: 0 }; // invalid hex fallback
        }
        
        const bigint = parseInt(hex, 16);
        return {
            r: ((bigint >> 16) & 255) / 255,
            g: ((bigint >> 8) & 255) / 255,
            b: (bigint & 255) / 255,
        };
    }

    async _loadFontBytes(weight = 'regular') {
        const fontFile =
            weight.toLowerCase() === 'bold'
            ? 'Roboto-Bold.ttf'
            : 'Roboto-Regular.ttf';
        return await fs.readFileSync(path.join(__dirname, '../public/fonts', fontFile));
    }

    async generateOneCertificate() {

        let res = {};

        try {
            const {
                firstname = 'John',
                lastname = 'Doe',
                textCase = 'normal',
                y = 300,
                fontSize = 36,
                color = '#000000',
                weight = 'regular'
            } = this.user_info.query;

            let fullName = `${firstname} ${lastname}`;
            switch (textCase.toLowerCase()) {
                case 'upper':
                    fullName = fullName.toUpperCase();
                    break;
                case 'lower':
                    fullName = fullName.toLowerCase();
                    break;
                case 'normal':
                default:
                    // no change
            }

            const fontSizeNum = parseFloat(fontSize);
            const yNum = parseFloat(y);
            const { r, g, b } = await this._hexToRgb(color);

            // Load assets
            const pdfBytes = await fs.readFileSync(path.join(__dirname, '../uploads', 'pdf-1750824583961-27414185.pdf'));
            const fontBytes = await this._loadFontBytes(weight);
            const pdfDoc = await PDFDocument.load(pdfBytes);
            pdfDoc.registerFontkit(fontkit);
            const customFont = await pdfDoc.embedFont(fontBytes);

            const page = pdfDoc.getPages()[0];
            const pageWidth = page.getWidth();

            // Measure text width to center horizontally
            const textWidth = customFont.widthOfTextAtSize(fullName, fontSizeNum);
            const xCentered = (pageWidth - textWidth) / 2;

            // Draw the full name centered
            page.drawText(fullName, {
                x: xCentered,
                y: yNum,
                size: fontSizeNum,
                font: customFont,
                color: rgb(r, g, b)
            });

            const finalPdfBytes = await pdfDoc.save();

            res.status = 'success';
            res.message = ''
            res.data = finalPdfBytes;

            return res;

        } catch (err) {

            res.status = 'error';
            res.message = 'something is wrong'
            res.data = [];

            return res;
        }
    }
}

module.exports = UploaderService