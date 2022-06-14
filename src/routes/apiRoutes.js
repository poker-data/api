/* const express = require("express");
const User = require("../models/user");
const Customer = require("../models/customer");
const editUserValidationSchema = require("../validations/editUserSchema");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const router = express.Router();

const cloudinary = require("cloudinary");
const customer = require("../models/customer");
cloudinary.config({
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.get("/users", async (req, res) => {
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
});

router.get("/users/:id", async (req, res) => {
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
});

router.put("/users/:_id", async (req, res) => {
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
});


router.delete("/users/:_id", async (req, res) => {
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
}); */

/* router.get("/customers", async (req, res) => {
  try {
    const customersList = await Customer.find({});
    if (customersList.length > 0) {
      const customers = customersList.filter(
        (customer) => customer.delete === false
      );

      res.json({ customers });
    } else {
      res.json("There are no customers");
    }
  } catch (err) {
    res.status(400).json(err);
  }
}); */

/* router.delete("/customer/:_id", function (req, res) {
  let _id = req.params._id;
  Customer.updateOne(
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
          msg: "Fail to delete customer",
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
}); */

/* router.get("/customer/:_id", function (req, res) {
  let _id = req.params._id;
  console.log(_id);
  Customer.find({ _id: _id }, function (error, info) {
    if (error) {
      res.json({
        result: false,
        msg: "Customer not found",
        error,
      });
    } else {
      res.json({
        result: true,
        info: info,
      });
    }
  });
});
 */
/* router.put("/customer/:_id", function (req, res) {
  let _id = req.params._id;
  let body = req.body;

  Customer.updateOne(
    { _id: _id },
    {
      $set: {
        name: body.name,
        rfc: body.rfc,
        razonSocial: body.razonSocial,
        email: body.email,
        mainAddress: body.mainAddress,
        telephone: body.telephone,
        colony: body.colony,
        city: body.city,
        country: body.country,
        postalCode: body.postalCode,
        conditions: body.conditions,
        currency: body.currency,
        lba: body.lba,
        delete: body.delete,
      },
    },
    function (error, info) {
      if (error) {
        res.json({
          result: false,
          msg: "Fail to modify customer",
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
});
 */
/* router.post("/customer", async (req, res) => {
  let {
    name,
    lastName,
    email,
    phone,
    mainAddress,
    city,
  } = req.body;

  try {
    Customer.find({ email: email }, function (err, customerDB) {
      if (err) {
        return res.json({
          success: false,
          msj: "Inexistent customer",
          err,
        });
      }
      if (customerDB.length > 0) {
        Customer.updateOne(
          { email: email },
          {
            $set: {
              name,
              lastName,
              email,
              phone,
              mainAddress,
              city,
              delete: false,
            },
          },
          function (error, info) {
            if (error) {
              res.json({
                ok: false,
                msg: "Fail to modify customer",
                err,
              });
            } else {
              res.json({
                ok: true,
                customer: info,
              });
            }
          }
        );
      } else {
        let customer = new Customer({
          name,
          lastName,
          email,
          phone,
          mainAddress,
          city,
        });
        console.log(customer);
        customer.save((err, customerDB) => {
          if (err) {
            return res.status(400).json({
              ok: false,
              err,
            });
          }
          res.json({
            ok: true,
            customer: customerDB,
          });
        });
      }
    });
  } catch (err) {
    res.status(400).json(err);
  }
}); */

module.exports = router;
