require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const passport = require("passport");

require("./services/passport");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", require("./routes/auth"));

const requireAuth = passport.authenticate("jwt", { session: false });
const moviesRouter = require("./routes/movies");
app.use("/api/movies", requireAuth, moviesRouter);
app.use("/api/v1/movies", requireAuth, moviesRouter);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Mongo connection error", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
