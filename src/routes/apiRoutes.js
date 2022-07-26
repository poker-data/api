const express = require("express");
const router = express.Router();
const {
  newUser,
  getUsers,
  getUser,
  editUser,
  deleteUser
} = require("../controllers/userController")
const { playerStatsController, userMetaData,playerFilters  } = require("../controllers/playerStatsController")
require('dotenv').config()


// /api/playerStatistics GET
router.get("/playerData/:playerName", async (req, res) => {

  try {

    let services = [playerStatsController(req), userMetaData(req), playerFilters(req)]

    let [newPlayerStats, newMetaData, playerSetFilters ] = await Promise.all(services.map(service =>
      service.catch(err => {
        console.log(error)
        return {
          error: err,
          stats: false
        }
      })
    ))
   //console.log(newPlayerStats, 'route')//obj respuesta de DB

/*     const checkErrorInApiResponse = newPlayerStats.status == 200 ? true : false 

    if (checkErrorInApiResponse) {
    
      res.status(404).json({ ok: false, info: 'not found api service' })

    }else{
     // console.log(JSON.parse(newPlayerStats.tempStats), 'route')//obj respuesta de api
      res.status(200).json({ ok: true, info: JSON.parse(newPlayerStats.tempStats) })
    } */
    res.status(200).json({ok:true, info: playerSetFilters  })


  } catch (error) {
    console.log(error)
    res.status(400).json({
      ok: false,
      info: error
    })
  }

})


// /api/register  POST
/* This is a post request to the route /register. It is receiving the data from the body of the request
and validating it with the userValidationSchema. If the data is valid, it is saving the user to the
database. */
router.get("/playerData/:playerName/:filter", function (req, res) {
  
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




router.get("/playerData/:playerName", async (req, res) => {


});






/**  */

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
