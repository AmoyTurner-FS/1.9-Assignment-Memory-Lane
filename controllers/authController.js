const jwt = require("jwt-simple");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

function tokenForUser(user) {
  const payload = { sub: user._id, iat: Date.now() };
  return jwt.encode(payload, JWT_SECRET);
}

exports.signup = async (req, res, next) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res
        .status(422)
        .json({ error: "Please provide your email and password." });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(422).json({ error: "Email already in use." });
    }

    const user = new User({ email, password });
    await user.save();

    res.send({ token: tokenForUser(user), user_id: user._id });
  } catch (err) {
    next(err);
  }
};

exports.signin = (req, res) => {
  const user = req.user; // set by passport local strategy
  res.send({ token: tokenForUser(user), user_id: user._id });
};
