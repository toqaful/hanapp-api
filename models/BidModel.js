module.exports = (sequelize, DataTypes) => {
    const Bid = sequelize.define('Bid', {
        amount: DataTypes.DECIMAL,
        is_top_10: DataTypes.BOOLEAN,
        is_refunded: DataTypes.BOOLEAN,
        created_at: { type: DataTypes.DATE, defaultValue: sequelize.NOW },
    });

    return Bid;
};