const express = require("express");
const router = express.Router();
const passport = require("passport");
require("../services/passport"); // ensure strategies are registered
const auth = require("../controllers/authController");

const requireLogin = passport.authenticate("local", { session: false });

router.post("/", auth.signup);
router.post("/signin", requireLogin, auth.signin);

module.exports = router;
