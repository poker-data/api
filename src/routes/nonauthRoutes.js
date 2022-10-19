const express = require("express");
const router = express.Router();
const axios = require("axios");
const User = require("../models/user");
//require("dotenv").config();
const { newUserController, loginUserController } = require("../controllers/userController");


router.get("/health-check", (req, res) => {
  res.json({ status: "health-ok" });
});


 router.post("/login", async (req, res) => {
    try {
      const token = await loginUserController(req);
      if(!token) {
        res.status(400).json({
          ok: false,
          info: "Invalid credentials"
        })
      } else {
        res.header('auth-token', token).json({
          ok: true,
          info: token
      })
      }
      
    } catch (error) {
      res.status(400).json({
        ok: false,
        info: error,
      });
    }
});

router.post("/register",async (req, res) => {
  try {
    const newUser = await newUserController(req);
    res.status(200).json({
      ok: true,
      info: newUser,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      info: error,
    });
  }

});


module.exports = router;
