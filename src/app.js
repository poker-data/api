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
app.use(cors());
app.use(express.static(__dirname + "/public"));

/*Routers used*/
const apiRoutes = require("./routes/apiRoutes");

/*Routes*/
app.use("/api/", apiRoutes);
  
/* Invalid routes final middleware */
app.use(function (_, res) {
  res.json({ status: "inexistent" });
});

module.exports = app;
