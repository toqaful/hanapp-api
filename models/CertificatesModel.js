const { poolPromise, sql } = require('../configs/db');

class CertificatesModel {

    constructor () {

    }

    async create(data) {
        try {
            const pool = await poolPromise;
            const res = await pool
                .request()
                .input('certName', sql.VarChar(50), data.CertName)
                .input('uploadedByID', sql.VarChar(50), data.UploadedByID)
                .query(`
                    INSERT INTO [Certificates] ([CertName], [UploadedByID])
                    OUTPUT INSERTED.*
                    VALUES (@certName, @uploadedByID)
                `);
        
            return res.recordset[0] || null;
        } catch (error) {
            return null;
        }
    }

    async findByUploadedByID(code) {
        try {
            const pool = await poolPromise
            const res = await pool
            .request()
            .input('code', sql.VarChar(50), code)
            .query('SELECT * FROM [Certificates] WHERE [UploadedByID] = @code');

            return res.recordset || [];
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
            .query('SELECT * FROM [Certificates] WHERE [CertID] = @certID');

            return res.recordset[0] || null;
        } catch (error) {
            return null;
        }
    }

    async update(data) {
        try {
            const pool = await poolPromise;
            const res = await pool
                .request()
                .input('certName', sql.VarChar(50), data.CertName)
                .input('certID', sql.VarChar(50), data.CertID)
                .input('uploadedByID', sql.VarChar(50), data.UploadedByID)
                .query(`
                    UPDATE [Certificates]
                    SET [CertName] = @certName
                    OUTPUT INSERTED.*
                    WHERE [CertID] = @certID AND UploadedByID = @uploadedByID
                `);
        
            return res.recordset[0] || null;
        } catch (error) {
            return null;
        }
    }
}

module.exports = CertificatesModel;
