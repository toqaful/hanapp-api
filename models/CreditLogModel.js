module.exports = (sequelize, DataTypes) => {
    const CreditLog = sequelize.define('CreditLog', {
        change: DataTypes.INTEGER,
        reason: DataTypes.STRING,
        source_id: DataTypes.INTEGER,
        source_type: DataTypes.STRING,
        created_at: { type: DataTypes.DATE, defaultValue: sequelize.NOW },
    });

    return CreditLog;
};