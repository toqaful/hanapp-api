module.exports = (sequelize, DataTypes) => {
    const Rating = sequelize.define('Rating', {
        score: DataTypes.INTEGER,
        comment: DataTypes.TEXT,
        created_at: { type: DataTypes.DATE, defaultValue: sequelize.NOW },
    });

    return Rating;
};