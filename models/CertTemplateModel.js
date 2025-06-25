const { poolPromise, sql } = require('../configs/db');

class CertTemplateModel {

    constructor () {

    }

    async create(data) {
        try {
            const pool = await poolPromise;
            const res = await pool
                .request()
                .input('certID', sql.VarChar(50), data.certID)
                .input('certPathName', sql.VarChar(50), data.certPathName)
                .input('uploadedByID', sql.VarChar(50), data.uploadedByID)
                .query(`
                    INSERT INTO [CertTemplate] ([CertID], [CertPathName], [UploadedByID])
                    OUTPUT INSERTED.*
                    VALUES (@certID, @certPathName, @uploadedByID)
                `);
        
            return res.recordset[0] || null;
        } catch (error) {
            return null;
        }
    }

    async findOneByCertID(certID) {
        try {
            const pool = await poolPromise
            const res = await pool
            .request()
            .input('certID', sql.VarChar(50), certID)
            .query('SELECT * FROM [CertTemplate] WHERE [CertID] = @certID');

            return res.recordset[0] || null;
        } catch (error) {
            return null;
        }
    }
}

module.exports = CertTemplateModel;
