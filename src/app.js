const express = require("express");
const session = require("express-session");
const cors = require("cors");
require("dotenv").config();

const { verifyToken } = require("./middlewares/authMiddleware");

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
const nonauthRoutes = require("./routes/nonauthRoutes");
const apiRoutes = require("./routes/apiRoutes");

//const authenticatedRoutes = require("./routes/authRoutes");
//const invoicesRoutes = require("./routes/invoices/invoicesRoutes");


/*Routes*/
app.use("/", nonauthRoutes);
app.use("/api/", apiRoutes);

//app.use("/", authenticatedRoutes);
//app.use("/api/", invoicesRoutes);

/* Invalid routes final middleware */
app.use(function (_, res) {
  res.json({ status: "inexistent" });
});

module.exports = app;
