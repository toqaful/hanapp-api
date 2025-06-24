const { poolPromise, sql } = require('../configs/db');

class UploaderModel {

    constructor () {

    }

    async create(data) {
        try {
            const pool = await poolPromise;
            const res = await pool
                .request()
                .input('uploaderID', sql.VarChar(50), data.UploaderID)
                .query(`
                    INSERT INTO [Uploader] ([UploaderID])
                    OUTPUT INSERTED.*
                    VALUES (@uploaderID)
                `);
        
            return res.recordset[0] || null;
        } catch (error) {
            return null;
        }
    }

    async findByUploaderID(code) {
        try {
            const pool = await poolPromise
            const res = await pool
            .request()
            .input('code', sql.VarChar(50), code)
            .query('SELECT * FROM [Uploader] WHERE [UploaderID] = @code');

            return res.recordset[0] || null;
        } catch (error) {
            return null;
        }
    }
}

module.exports = UploaderModel;
