module.exports = (sequelize, DataTypes) => {
    const Job = sequelize.define('Job', {
        title: DataTypes.STRING,
        description: DataTypes.TEXT,
        category: DataTypes.STRING,
        location: DataTypes.STRING,
        urgency: DataTypes.STRING,
        expires_at: DataTypes.DATE,
        status: DataTypes.STRING,
    });

    return Job;
};