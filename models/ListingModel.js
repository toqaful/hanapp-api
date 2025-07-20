module.exports = (sequelize, DataTypes) => {
    const Listing = sequelize.define('Listing', {
        title: DataTypes.STRING,
        description: DataTypes.TEXT,
        category: DataTypes.STRING,
        location: DataTypes.STRING,
        price: DataTypes.DECIMAL,
        expires_at: DataTypes.DATE,
        is_permanent: DataTypes.BOOLEAN,
        status: DataTypes.STRING,
    });

    return Listing;
};