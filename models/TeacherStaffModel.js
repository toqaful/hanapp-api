const { poolPromise, sql } = require('../configs/db');

class TeacherStaffModel {

    constructor () {

    }

    async findByEmail(email) {
        try {
            const pool = await poolPromise
            const res = await pool
            .request()
            .input('email', email)
            .query('SELECT * FROM TeacherStaff WHERE Email = @email');

            return res.recordset[0] || null;
        } catch (error) {
            return null;
        }
    }

    async findCodeByCode(code) {
        try {
            const pool = await poolPromise
            const res = await pool
            .request()
            .input('code', sql.VarChar(50), code)
            .query('SELECT [Code] FROM TeacherStaff WHERE [Code] = @code');

            return res.recordset[0] || null;
        } catch (error) {
            return null;
        }
    }
}

module.exports = TeacherStaffModel;
