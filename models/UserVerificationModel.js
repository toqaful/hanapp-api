module.exports = (sequelize, DataTypes) => {
    const UserVerification = sequelize.define('UserVerification', {
        id_image: DataTypes.STRING,
        selfie_image: DataTypes.STRING,
        status: DataTypes.ENUM('pending', 'approved', 'rejected'),
        verified_at: DataTypes.DATE,
    });

    return UserVerification;
};