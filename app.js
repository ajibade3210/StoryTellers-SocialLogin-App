const fs = require("fs");
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const https = require("https");
const passport = require("passport");
const session = require("express-session");
const connectDB = require("./config/db");
const MongoStore = require("connect-mongo");
require("dotenv").config();
const { engine } = require("express-handlebars");
const storiesRouter = require("./routes/stories.routes");
const authRouter = require("./routes/auth.routes");
const route = require("./routes/index.routes");
connectDB();
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Passport Config
require("./config/passport")(passport);

//Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//VIEW = Handlebars
// app.engine(".hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
// app.set("view engine", ".hbs");
app.engine(
  ".hbs",
  engine({
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");
app.set("views", "./views");

//Session
app.use(
  session({
    secret: "Keyboard gIST",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      dbName: "storytellers",
    }),
  })
);

//Adding Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//Static Folder
app.use(express.static(path.join(__dirname, "public")));

//Routes
app.use("/", route);
app.use("/auth", authRouter);
app.use("/stories", storiesRouter);

const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log(`Listening On Port: ${process.env.NODE_ENV} ${PORT}`);
// });

https
  .createServer(
    {
      key: fs.readFileSync("key.pem"),
      cert: fs.readFileSync("cert.pem"),
    },
    app
  )
  .listen(PORT, () => {
    console.log(`Listening On Port: ${process.env.NODE_ENV} ${PORT}`);
  });
