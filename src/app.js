const express = require("express");
const session = require("express-session");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(
  session({
    secret: "pokerdata_backend",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies
app.use(express.json()); //Used to parse JSON bodies
var corsOptions = {
  origin: 'https://www.bbzlatam.app/',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));
app.use(express.static(__dirname + "/public"));

/*Routers used*/
const nonauthRoutes = require("./routes/nonauthRoutes");
const apiRoutes = require("./routes/apiRoutes");

/*Routes*/
app.use("/", nonauthRoutes);
app.use("/api/", apiRoutes);

/* Invalid routes final middleware */
app.use(function (_, res) {
  res.json({ status: "inexistent" });
});

module.exports = app;
