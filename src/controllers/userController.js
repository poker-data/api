const User = require("../models/user");
const editUserValidationSchema = require("../validations/userSchema");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const userValidationSchema = require("../validations/userSchema");

const newUser = async(req, res) => {
    let data = req.body;
    console.log(data);
    Joi.validate(data, userValidationSchema, (err, value) => {
      if (err) {
        console.log("there was an error with the validation");
        console.log(err.details[0].message);
        res.status(422).json({
          status: "error",
          message: "Invalid request data",
          data: data,
        });
      } else {
        const { password } = data;
        let user = new User({
          ...data,
          deleted: false,
          password: bcrypt.hashSync(password, 10),
        });
        user.save((err, userDB) => {
          if (err) {
            return res.status(400).json({
              ok: false,
              err,
            });
          }
          res.json({
            ok: true,
            user: userDB,
          });
        });
      }
    });
}

const getUsers = async(req, res) => {
    try {
        const users = await User.find({});
        //console.log(users);
        if (users.length > 0) {
          const filteredUsers = users.filter((user) => user.delete === false);
          res.json({ filteredUsers });
        } else {
          res.json("There are not users");
        }
      } catch (e) {
        //console.log(e);
        res.json(e);
      }
}

const getUser = async(req, res) => {
    const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (user) {
      res.json(user);
    } else {
      res.json("No user found");
    }
  } catch (e) {
    res.json(e);
  }
}

const editUser = async(req, res) => {
    let data = req.body;
    let _id = req.params._id;
    console.log(data);
    Joi.validate(data, editUserValidationSchema, (err, value) => {
      if (err) {
        console.log("there was an error with the validation");
        console.log(err.details[0].message);
        res.status(422).json({
          status: "error",
          message: "Invalid request data",
          data: data,
        });
      } else {
        const { password } = data;
        let dataToWrite = {
          name: data.name,
          email: data.email,
          role: data.role,
        };
        if (password) {
          dataToWrite.password = bcrypt.hashSync(password, 10);
        }
        User.updateOne(
          { _id: _id },
          {
            $set: {
              ...dataToWrite,
            },
          },
          function (error, info) {
            if (error) {
              res.json({
                result: false,
                msg: "Fail to modify user",
                err,
              });
            } else {
              res.json({
                result: true,
                info: info,
              });
            }
          }
        );
      }
    });
}

const deleteUser = async(req, res) => {
    let _id = req.params._id;
    console.log(req.params);
    User.updateOne(
      { _id: _id },
      {
        $set: {
          delete: true,
        },
      },
      function (error, info) {
        if (error) {
          res.json({
            result: false,
            msg: "Fail to delete user",
            err,
          });
        } else {
          res.json({
            result: true,
            info: info,
          });
        }
      }
    );
}





module.exports = {
    newUser,
    getUsers,
    getUser,
    editUser,
    deleteUser,
}