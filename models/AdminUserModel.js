module.exports = (sequelize, DataTypes) => {
    const AdminUser = sequelize.define('AdminUser', {
        username: DataTypes.STRING,
        password_hash: DataTypes.STRING,
        role: DataTypes.STRING,
    });

    return AdminUser;
};