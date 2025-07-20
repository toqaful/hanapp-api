module.exports = (sequelize, DataTypes) => {
    const Booking = sequelize.define('Booking', {
        status: DataTypes.ENUM('confirmed', 'started', 'completed', 'cancelled'),
        started_at: DataTypes.DATE,
        completed_at: DataTypes.DATE,
        confirmed_at: DataTypes.DATE,
    });

    return Booking;
};