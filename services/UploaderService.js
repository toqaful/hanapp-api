const fs = require('fs');
const TeacherStaffModel = require('../models/TeacherStaffModel');
const UploaderModel = require('../models/UploaderModel');

class UploaderService {
    
    constructor (user_info = null) {
        this.user_info = user_info;
        this.uploader_model = new UploaderModel();
        this.teacher_staff_model = new TeacherStaffModel();
    }

    async addUploader() {

        let res = {};
        let data = {};

        data.UploaderID = this.user_info.body.UploaderID;

        let create_uploader = await this.uploader_model.create(data);

        if (!create_uploader) {

            res.status = 'error';
            res.message = 'not added'
            res.data = [];

            return res;
        }

        res.status = 'success';
        res.message = 'added'
        res.data = create_uploader;

        return res;
    }

    async validateUploader() {

        let res = {};

        if (!this.user_info.body || !this.user_info.body.UploaderID) {

            res.status = 'error';
            res.message = 'something is wrong'
            res.data = [];

            return res;
        }

        let teacher_staff = await this.teacher_staff_model.findCodeByCode(this.user_info.body.UploaderID);

        if (teacher_staff == null) {

            res.status = 'error';
            res.message = 'something is wrong'
            res.data = [];

            return res;
        }

        let exist = await this.uploader_model.findByUploaderID(this.user_info.body.UploaderID);

        if (exist) {

            res.status = 'error';
            res.message = 'already exist'
            res.data = [];

            return res;
        }

        res.status = 'success';
        res.message = 'valid'
        res.data = [];

        return res;
    }
}

module.exports = UploaderService