if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const passport = require("passport");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

const connectDb = async () => {
  await mongoose.connect(process.env.MONGO_URL).then(() => {
    app.listen(port, () => {
      console.log(`listening on port:${port}`);
    });
  });
};
connectDb();

const store = new MongoDBStore({
  uri: `${process.env.MONGO_URL}`,
  collection: "sessions",
});
store.on("error", (error) => {
  console.log(error, "Session store failed to connect");
});
sessionConfig = {
  secret: process.env.SESSION_SECRET,
  store: store,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7,
    secure: process.env.NODE_ENV === "production",
    domain:"https://travel-companion-api-gfjw.onrender.com/"
  },
  resave: false,
  saveUninitialized: true,
};


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({
  origin: "https://travel-companion-henna.vercel.app/",
  credentials: true,
}));


const userRouter = require("./controller/routes/userRoutes.js");
const getRelatedUsers = require("./controller/routes/suggestedUsersPQRoute.js");
const friendReqRouter = require("./controller/routes/friendRoutes.js");
const authRouter = require("./controller/routes/authRoutes.js");


app.use("/api/auth", authRouter);
app.use("/api", userRouter);
app.use("/api", friendReqRouter);
app.use("/api", getRelatedUsers);

app.all("*", (req, res) => {
  res.status(404).json({ error: "not found!" });
});
