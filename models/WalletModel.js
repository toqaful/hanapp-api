module.exports = (sequelize, DataTypes) => {
    const Wallet = sequelize.define('Wallet', {
        balance: DataTypes.DECIMAL,
    });

    return Wallet;
};