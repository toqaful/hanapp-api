require("dotenv").config();
const express = require("express");
const db = require('./config/db');

// const cors = require("cors");

// const AuthRoutes = require('./routes/AuthRoutes');
const BackendRoutes = require('./routes/BackendRoutes');
// const FrontendRoutes = require('./routes/FrontendRoutes');

const app = express();

app.use(express.json());

// app.use(cors({
//   origin: process.env.BASE_URL,
//   credentials: true
// }));

// passport.use(new GoogleStrategy({
//   clientID: process.env.GOOGLE_CLIENT_ID,
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//   callbackURL: process.env.GOOGLE_CALLBACK
// },
// function(accessToken, refreshToken, profile, done) {
//   return done(null, profile);
// }
// ));

// app.use(passport.initialize());

// app.use("/auth", AuthRoutes);
app.use("/api", BackendRoutes);
// app.use("/", FrontendRoutes);

db.sequelize.sync({ alter: true }).then(() => {
  console.log('✅ DB synced');
  app.listen(process.env.PORT, () => console.log('🚀 Server running on port ' + process.env.PORT));
});
