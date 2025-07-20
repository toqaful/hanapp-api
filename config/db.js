require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Load models
db.Role = require('../models/RoleModel')(sequelize, DataTypes);
db.User = require('../models/UserModel')(sequelize, DataTypes);
db.UserVerification = require('../models/UserVerificationModel')(sequelize, DataTypes);
db.Listing = require('../models/ListingModel')(sequelize, DataTypes);
db.Job = require('../models/JobModel')(sequelize, DataTypes);
db.Bid = require('../models/BidModel')(sequelize, DataTypes);
db.Booking = require('../models/BookingModel')(sequelize, DataTypes);
db.CreditLog = require('../models/CreditLogModel')(sequelize, DataTypes);
db.Wallet = require('../models/WalletModel')(sequelize, DataTypes);
db.Subscription = require('../models/SubscriptionModel')(sequelize, DataTypes);
db.AdminUser = require('../models/AdminUserModel')(sequelize, DataTypes);
db.Report = require('../models/ReportModel')(sequelize, DataTypes);
db.Rating = require('../models/RatingModel')(sequelize, DataTypes);

// Setup associations
db.User.belongsTo(db.Role, { foreignKey: 'role_id' });
db.UserVerification.belongsTo(db.User, { foreignKey: 'user_id' });
db.Listing.belongsTo(db.User, { foreignKey: 'user_id' });
db.Job.belongsTo(db.User, { foreignKey: 'user_id' });
db.Bid.belongsTo(db.Job, { foreignKey: 'job_id' });
db.Bid.belongsTo(db.User, { foreignKey: 'provider_id' });
db.Booking.belongsTo(db.Listing, { foreignKey: 'listing_id' });
db.Booking.belongsTo(db.User, { foreignKey: 'client_id' });
db.CreditLog.belongsTo(db.User, { foreignKey: 'user_id' });
db.Wallet.belongsTo(db.User, { foreignKey: 'user_id' });
db.Subscription.belongsTo(db.User, { foreignKey: 'user_id' });
db.Report.belongsTo(db.User, { as: 'Reporter', foreignKey: 'reporter_id' });
db.Report.belongsTo(db.User, { as: 'TargetUser', foreignKey: 'target_user_id' });
db.Rating.belongsTo(db.Booking, { foreignKey: 'booking_id' });
db.Rating.belongsTo(db.User, { as: 'FromUser', foreignKey: 'from_user_id' });
db.Rating.belongsTo(db.User, { as: 'ToUser', foreignKey: 'to_user_id' });

module.exports = db;
