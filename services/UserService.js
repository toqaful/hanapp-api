require("dotenv").config();
const fs = require('fs');
const { User, Role } = require('../config/db');
const admin = require('../config/firebase');

class UserService {
    
    constructor (user_info = null) {
        this.user_info = user_info;
    }

    async createUserProvider() {

        let res = {};

        let data = await User.create({
            firstname: this.user_info.body.firstname,
            middlename: this.user_info.body.middlename ? this.user_info.body.middlename : '',
            lastname: this.user_info.body.lastname,
            nickname: this.user_info.body.nickname ? this.user_info.body.nickname : '',
            gender: this.user_info.body.gender,
            datebirth: this.user_info.body.datebirth,
            address: this.user_info.body.address,
            phone: this.user_info.body.phone,
            email: this.user_info.body.email,
            profilepicture: this.user_info.files['pic'][0].filename,
            govidpicture: this.user_info.files['gov'][0].filename,
            is_verified: true,
        });

        res.status = 'success';
        res.message = '';
        res.data = data;

        return res;
    }

    async validateFieldsProvider() {

        let res = {};

        if (!this.user_info.body || !this.user_info.body.firstname || !this.user_info.body.lastname || !this.user_info.body.gender || !this.user_info.body.datebirth || !this.user_info.body.address || !this.user_info.body.phone || !this.user_info.body.email || !this.user_info.files || !this.user_info.files['pic'] || !this.user_info.files['gov'] || !this.user_info.body.idtoken) {

            this._removeOnUploadGovProvider();
            this._removeOnUploadPictureProvider();

            res.status = 'error';
            res.message = 'something is wrong'
            res.data = [];

            return res;
        }

        try {
            // Verify Firebase ID token
            const decoded = await admin.auth().verifyIdToken(this.user_info.body.idtoken);
            const phone = decoded.phone_number;
        } catch (error) {
            // console.error("Error verifying token:", error);
            // res.status(401).json({ success: false, error: "Invalid or expired OTP" });
            res.status = 'error';
            res.message = 'Invalid or expired OTP ' + error;
            res.data = [];

            return res;
        }

        res.status = 'success';
        res.message = 'valid'
        res.data = [];

        return res;
    }

    async _removeOnUploadGovProvider() {
        if (this.user_info.hasOwnProperty('files') && this.user_info.files['gov']) {
            const path = `uploads/${this.user_info.files['gov'][0].filename}`;
            await fs.unlink(path, (err) => {
                if (err) {
                    console.error(err)
                    return;
                }
                //file removed
            });
        }
    }

    async _removeOnUploadPictureProvider() {
        if (this.user_info.hasOwnProperty('files') && this.user_info.files['pic']) {
            const path = `uploads/${this.user_info.files['pic'][0].filename}`;
            await fs.unlink(path, (err) => {
                if (err) {
                    console.error(err)
                    return;
                }
                //file removed
            });
        }
    }

    // async validateEmail() {

    //     let res = {};

    //     let teacher_staff = await this.teacher_staff_model.findByEmail(this.user_info.user.emails[0].value)

    //     if (teacher_staff) {
    //         res.status = 'success';
    //         res.message = ''
    //         res.data = teacher_staff;
    //         res.data.role = 'user';
    //         res.data.is_uploader = false;

    //         let uploader = await this.uploader_model.findByUploaderID(teacher_staff.CODE);

    //         if(uploader) {
    //             res.data.is_uploader = uploader.isDisabled == 0 ? true : false;
    //         }

    //         const buffer = Buffer.from(teacher_staff.Picture);
    //         const base64Image = buffer.toString('base64');

    //         res.data.pic = `data:image/jpeg;base64,${base64Image}`;

    //         return res;
    //     }

    //     res.status = 'error';
    //     res.message = 'unauthorized'
    //     res.data = [];

    //     return res;
    // }

    // async validateToken(token) {

    //     let res = {};

    //     if (!token) {
    //         res.status = 'error';
    //         res.message = 'unauthorized'
    //         res.data = [];

    //         return res;
    //     } 
        
    //     try {
    //         let decoded = await jwt.verify(token, process.env.JWT_SECRET);
    //         res.status = 'success';
    //         res.message = '';
    //         res.data = decoded;

    //         return res;

    //     } catch (e) {
    //         res.status = 'error';
    //         res.message = 'unauthorized'
    //         res.data = [];

    //         return res;
    //     }
    // }

    // async findCode() {
    //     let res = {};

    //     res.status = 'success';
    //     res.message = '';

    //     let teacher_staff = await this.teacher_staff_model.findCodeByCode(this.user_info.Code);

    //     if (teacher_staff == null) {
    //         res.status = 'error';
    //         res.message = 'user not found';
    //     }

    //     res.data = teacher_staff;

    //     return res;
    // }
}

module.exports = UserService