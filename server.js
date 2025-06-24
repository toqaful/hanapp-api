require("dotenv").config();
const express = require("express");
const path = require('path');
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const cors = require("cors");

const AuthRoutes = require('./routes/AuthRoutes');
const BackendRoutes = require('./routes/BackendRoutes');
const FrontendRoutes = require('./routes/FrontendRoutes');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.use(cors({
  origin: process.env.BASE_URL,
  credentials: true
}));

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK
},
function(accessToken, refreshToken, profile, done) {
  return done(null, profile);
}
));

app.use(passport.initialize());

app.use("/auth", AuthRoutes);
app.use("/api", BackendRoutes);
app.use("/", FrontendRoutes);

app.listen(process.env.SRV_PORT, () => {
  console.log(`Backend running on http://localhost:${process.env.SRV_PORT}`);
});
