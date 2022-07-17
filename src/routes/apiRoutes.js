const express = require("express");
const router = express.Router();
const {
  newUser,
  getUsers,
  getUser,
  editUser,
  deleteUser
} = require("../controllers/userController")
const { newTempPlayerStats } = require("../controllers/playerStatsController")
const config = require('config');
const axios = require('axios');
require('dotenv').config()

const parser = require('xml2json');
const { process } = require("joi/lib/errors");

// /api/register  POST
/* This is a post request to the route /register. It is receiving the data from the body of the request
and validating it with the userValidationSchema. If the data is valid, it is saving the user to the
database. */
router.post("/register", function (req, res) {
  newUser(req, res);
});

// /api/users GET
/* This is a get request to the route /users. It is receiving the data from the body of the request
and validating it with the userValidationSchema. If the data is valid, it is saving the user to the
database. */
router.get("/users", async (req, res) => {
  getUsers(req, res);
});

// /api/users/:id GET
/* This is a get request to the route /users/:id. It is receiving the data from the body of the request
and validating it with the userValidationSchema. If the data is valid, it is saving the user to the
database. */
router.get("/users/:id", async (req, res) => {
  getUser(req, res);
});

// /api/users/:id PUT
/* This is a put request to the route /users/:id. It is receiving the data from the body of the request
and validating it with the userValidationSchema. If the data is valid, it is saving the user to the
database. */
router.put("/users/:_id", async (req, res) => {
  editUser(req, res);
});


router.delete("/users/:_id", async (req, res) => {
  deleteUser(req, res);
});


// /api/playerStatistics POST
/* A post request to the route /playerStatistics. It is receiving the data from the body of the request
and validating it with the dateValidationSchema. If the data is valid, it is saving the playerStatistics to the
database. */
router.post("/playerStatistics", async (req, res) => {
//  newPlayerStats(req, res);
})

 router.get("/playerData/:playerName", async (req, res) => {
  let playerName = req.params.playerName;
  try {

    let url = config.get(`url_services.player_info`);
    url = `${url}/${playerName}/statistics`;
    
    
   const response = await axios.get(url, {
      headers :{
         Accept: 'application/xml',
        Username:'bbzlatam@gmail.com',
        Password:'5b33a53c48de380f34ea5c0863bb37a2'
      }
    });

    let data = response.data//data.Response.PlayerResponse;
    console.log(data) 
    let jsonString = parser.toJson(data);
    let tempStats = newTempPlayerStats(json, playerName);
    res.json({
      result: true,
      info: JSON.parse(jsonString),
    });
   
  } catch (err) {
    console.log("salio")
    res.status(400).json(err);
  }
}); 




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
