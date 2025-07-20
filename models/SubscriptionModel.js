module.exports = (sequelize, DataTypes) => {
    const Subscription = sequelize.define('Subscription', {
        tier: DataTypes.STRING,
        credits_granted: DataTypes.INTEGER,
        started_at: DataTypes.DATE,
        expires_at: DataTypes.DATE,
    });

    return Subscription;
};