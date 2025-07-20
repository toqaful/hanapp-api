module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        firstname: DataTypes.STRING,
        middlename: DataTypes.STRING,
        lastname: DataTypes.STRING,
        nickname: DataTypes.STRING,
        gender: DataTypes.STRING,
        datebirth: DataTypes.STRING,
        address: DataTypes.STRING,
        phone: DataTypes.STRING(20),
        email: DataTypes.STRING(50),
        profilepicture: DataTypes.STRING,
        govidpicture: DataTypes.STRING,
        is_verified: DataTypes.BOOLEAN,
        created_at: { type: DataTypes.DATE, defaultValue: sequelize.literal('CURRENT_TIMESTAMP') }
    });

    return User;
};