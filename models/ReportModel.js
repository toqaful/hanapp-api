module.exports = (sequelize, DataTypes) => {
    const Report = sequelize.define('Report', {
        target_type: DataTypes.STRING,
        reason: DataTypes.TEXT,
        created_at: { type: DataTypes.DATE, defaultValue: sequelize.NOW },
    });
    return Report;
};