require("dotenv").config();
const jwt = require("jsonwebtoken");

const TeacherStaffModel = require('../models/TeacherStaffModel');
const UploaderModel = require('../models/UploaderModel');

class AuthService {
    
    constructor (user_info = null) {
        this.user_info = user_info;
        this.teacher_staff_model = new TeacherStaffModel();
        this.uploader_model = new UploaderModel();
    }

    async generateToken(data) {

        let res = {};
        let payload = {};

        payload.id = this.user_info.user.id;
        payload.display_name = this.user_info.user.displayName;
        payload.email = this.user_info.user.emails[0].value;
        payload.user_code = data.CODE;
        payload.user_role = data.role;
        payload.is_uploader = data.is_uploader;

        const token = await jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status = 'success';
        res.message = '';
        res.data = token;

        return res;
    }

    async validateEmail() {

        let res = {};

        let teacher_staff = await this.teacher_staff_model.findByEmail(this.user_info.user.emails[0].value)

        if (teacher_staff) {
            res.status = 'success';
            res.message = ''
            res.data = teacher_staff;
            res.data.role = 'user';
            res.data.is_uploader = false;

            let uploader = await this.uploader_model.findByUploaderID(teacher_staff.CODE);

            if(uploader) {
                res.data.is_uploader = uploader.isDisabled == 0 ? true : false;
            }

            const buffer = Buffer.from(teacher_staff.Picture);
            const base64Image = buffer.toString('base64');

            res.data.pic = `data:image/jpeg;base64,${base64Image}`;

            return res;
        }

        res.status = 'error';
        res.message = 'unauthorized'
        res.data = [];

        return res;
    }

    async validateToken(token) {

        let res = {};

        if (!token) {
            res.status = 'error';
            res.message = 'unauthorized'
            res.data = [];

            return res;
        } 
        
        try {
            let decoded = await jwt.verify(token, process.env.JWT_SECRET);
            res.status = 'success';
            res.message = '';
            res.data = decoded;

            return res;

        } catch (e) {
            res.status = 'error';
            res.message = 'unauthorized'
            res.data = [];

            return res;
        }
    }

    async findCode() {
        let res = {};

        res.status = 'success';
        res.message = '';

        let teacher_staff = await this.teacher_staff_model.findCodeByCode(this.user_info.Code);

        if (teacher_staff == null) {
            res.status = 'error';
            res.message = 'user not found';
        }

        res.data = teacher_staff;

        return res;
    }
}

module.exports = AuthService