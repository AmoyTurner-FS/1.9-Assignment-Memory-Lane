const passport = require("passport");
const User = require("../models/User");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const LocalStrategy = require("passport-local").Strategy;

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

/** Local strategy: email + password login */
const localOptions = { usernameField: "email" };
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  User.findOne({ email }, (err, user) => {
    if (err) return done(err);
    if (!user) return done(null, false);
    user.comparePassword(password, (err2, isMatch) => {
      if (err2) return done(err2);
      if (!isMatch) return done(null, false);
      return done(null, user);
    });
  });
});

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: JWT_SECRET,
};

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  User.findById(payload.sub, (err, user) => {
    if (err) return done(err, false);
    if (user) return done(null, user);
    return done(null, false);
  });
});

// Plug strategies into passport
passport.use(localLogin);
passport.use(jwtLogin);

module.exports = passport;
