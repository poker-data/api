const express = require("express");
const router = express.Router();
const {
  playerStatsController,
  playerFiltersFromApi,
  groupDefaultFiltersFromApi,
  tournamentsFiltersFromApi,
} = require("../controllers/playerStatsController");
const { newPlayerController, findPlayersController } = require("../controllers/playerController");

const {findRoomStatsController, setRoomStatsController} = require("../controllers/roomStatsController");

const { getGroupController, setGroupController } = require("../controllers/groupController");

const {remainingRequestsController} = require("../controllers/infoController");

const { verifyToken } = require("../middlewares/authMiddleware");
const { findUserInDb } = require("../utils/finders");
const { updateUserInDb, deleteUserInDb, getUserController } = require("../controllers/userController");

require('dotenv').config()


router.get("/health-check" ,(req, res) => {
  res.json({ status: "health-ok" });
});


router.post("/remainingRequest", verifyToken ,async (req, res) => {

  try {

    let services = [remainingRequestsController(req)]

    let [remainingRequest] = await Promise.all(services.map(service =>
      service.catch(err => {
        console.log(err)
        return {
          ok: false,
          info: err
        }
      })
    ))
    res.status(200).json({
      ok: true,
      info: remainingRequest
    }
    )

  } catch (error) {
    console.log(error)
    res.status(400).json({
      ok: false,
      info: error
    })
  }

})



router.post("/playerData", verifyToken ,async (req, res) => {

  try {

    let services = [playerStatsController(req)]

    let [newPlayerStats] = await Promise.all(services.map(service =>
      service.catch(err => {
        console.log(err)
        return {
          ok: false,
          info: err
        }
      })
    ))
    res.status(200).json({
      ok: true,
      info: newPlayerStats
    }
    )

  } catch (error) {
    console.log(error)
    res.status(400).json({
      ok: false,
      info: error
    })
  }

})

//api/playerStatistics with filter GET
router.post("/playerDataFiltered/:playerName", verifyToken, async (req, res) => {

  try {

    let services = [ playerFiltersFromApi(req)]

    let [playerSetFilters] = await Promise.all(services.map(service =>
      service.catch(err => {
        return {
          ok: false,
          info: err
        }
      })
    ))
    res.status(200).json({
      ok: true,
      info: playerSetFilters
    }
    )

  } catch (error) {
    console.log(error)
    res.status(400).json({
      ok: false,
      info: error
    })
  }

})


//api/register  POST
/* This is a post request to the route /register saving the user to the
database. */
router.post("/setPlayerData", verifyToken, async (req, res) => {
  try {

    let services = [newPlayerController(req)]

    let [newPlayerResult] = await Promise.all(services.map(service =>
      service.catch(err => {
        console.log(error)
        return {
          ok: false,
          info: err
        }
      })
    ))

    res.status(200).json({ 
      ok: true, 
      info: newPlayerResult
     })

  } catch (error) {
    //console.log(error)
    res.status(400).json({
      ok: false,
      info: error
    })
  }
});

router.get("/getPlayers", verifyToken ,async (req, res) => {
  try {
    let services = [findPlayersController()]

    let [playerData] = await Promise.all(services.map(service =>
      service.catch(err => {
        console.log(err)
        return {
          ok: false,
          info: err
        }
      })
    ))

    res.status(200).json({
      ok: true,
      info: playerData
    })
  }
  catch (error) {
    res.status(400).json({
      ok: false,
      info: error
    })
  }
}
)

router.get("/getRoomStats", verifyToken, async (req, res) => {
  try {

    let services = [findRoomStatsController()]

    let [roomData] = await Promise.all(services.map(service =>
      service.catch(err => {
        console.log(error)
        return {
          ok: false,
          info: err
        }
      })
    ))

    res.status(200).json({
      ok: true,
      info: roomData
    })
  }
  catch (error) {
    res.status(400).json({
      ok: false,
      info: error
    })
  }
}
)

router.post("/setRoomStats", verifyToken, async (req, res) => {
  try {

    let services = [setRoomStatsController(req)]

    let [newRoomStats] = await Promise.all(services.map(service =>
      service.catch(err => {
        console.log(error)
        return {
          ok: false,
          info: err
        }
      })
    ))

    res.status(200).json({ 
      ok: true, 
      info: newRoomStats
     })

  } catch (error) {
    //console.log(error)
    res.status(400).json({
      ok: false,
      info: error
    })
  }
});

router.get("/getRooms", verifyToken, async (req, res) => {
  try {

    const rooms = [
      {room : 'iPoker',},
      {room : 'GGNetwork',},
      {room : 'PokerStars',},
      {room : '888Poker',},
      {room : 'Chico',},
      {room : 'WPN',},
      {room : 'PartyPoker',},
      {room : 'PokerStars(FR-ES-PT)',},
      {room : 'Winamax.fr'}
    ];

    res.status(200).json({
      ok: true,
      info: rooms
    })
  }
  catch (error) {
    res.status(400).json({
      ok: false,
      info: error
    })
  }
}
)

router.get("/getRegions", verifyToken, async (req, res) => {
  try {
    const regions = [
      {region : 'Latam',},
      {region : 'Colombia',},
      {region : 'Venezuela',},
      {region : 'España',},
      {region : 'Francia',},
      {region : 'Portugal',}
    ];

    res.status(200).json({
      ok: true,
      info: regions
    })
  }
  catch (error) {
    res.status(400).json({
      ok: false,
      info: error
    })
  }
}
)

router.get("/getDefaultFilters", verifyToken, async (req, res) => {
  try {
    
    const defaultFilters = [
      {id:1,filterType : 'filterType1', filterName: 'MTT - Total'},
      {id:2,filterType : 'filterType2', filterName: 'MTT - High'},
      {id:3,filterType : 'filterType3', filterName: 'MTT - Medium'},
      {id:4,filterType : 'filterType4', filterName: 'MTT - Low'},
      {id:5,filterType : 'filterType5', filterName: 'SNG'}  
    ];

    res.status(200).json({
      ok: true,
      info: defaultFilters
    })
  }
  catch (error) {
    res.status(400).json({
      ok: false,
      info: error
    })
  }
}
)

router.get("/getRegions", verifyToken, async (req, res) => {
  try {

    const regions = [
      {region : 'Latam',},
      {region : 'Colombia',},
      {region : 'Venezuela',},
      {region : 'Brasil',},
      {region : 'España',},
      {region : 'Francia',},
      {region : 'Portugal',}
    ];

    res.status(200).json({
      ok: true,
      info: regions
    })
  }
  catch (error) {
    res.status(400).json({
      ok: false,
      info: error
    })
  }
}
)

router.get("/getGroups", verifyToken, async (req, res) => {
  try {
    let services = [getGroupController()]

    let [groups] = await Promise.all(services.map(service =>
      service.catch(err => {
        return {
          ok: false,
          info: err
        }
      })
    ))

   if(groups?.length > 0 ){
    res.status(200).json({
      ok: true,
      info: groups
    })
   }else{
    res.status(400).json({
      ok: false,
      info: groups
    })
   }
  
  }
  catch (error) {
    res.status(400).json({
      ok: false,
      info: error
    })
  }
}
)

router.post("/setGroup", verifyToken, async (req, res) => {
  try {

    let services = [setGroupController(req)]

    let [newGroup] = await Promise.all(services.map(service =>
      service.catch(err => {
        console.log(error)
        return {
          ok: false,
          info: err
        }
      })
    ))

    res.status(200).json({ 
      ok: true, 
      info: newGroup
     })

  } catch (error) {
    //console.log(error)
    res.status(400).json({
      ok: false,
      info: error
    })
  }
}
)

router.post("/getDefaultGroupFiltersData", verifyToken, async (req, res) => {

  try {

    let services = [ groupDefaultFiltersFromApi(req)]

    let [groupData] = await Promise.all(services.map(service =>
      service.catch(err => {
        return {
          ok: false,
          info: err
        }
      })
    ))
    res.status(200).json({
      ok: true,
      info: groupData
    }
    )

  } catch (error) {
    console.log(error)
    res.status(400).json({
      ok: false,
      info: error
    })
  }

});

router.post("/getTournamentsData", verifyToken, async (req, res) => {

  try {

    let services = [ tournamentsFiltersFromApi(req)]

    let [tournamentData] = await Promise.all(services.map(service =>
      service.catch(err => {
        return {
          ok: false,
          info: err
        }
      })
    ))
    res.status(200).json({
      ok: true,
      info: tournamentData
    }
    )

  } catch (error) {
    console.log(error)
    res.status(400).json({
      ok: false,
      info: error
    })
  }

});

// /api/users/:id GET
/* This is a get request to the route /users/:id. It is receiving the data from the body of the request
and validating it with the userValidationSchema. If t he data is valid, it is saving the user to the
database. */


router.post("/admindashboard/users", async (req, res) => {

  const { id } = req.body

  try {

    let services = [findUserInDb(id)]

    let [userData] = await Promise.all(services.map(service =>
      service.catch(err => {
        console.log(err)
        return {
          ok: false,
          info: err
        }
      })
    ))
    res.status(200).json({
      ok: true,
      info: userData
    })
  }
  catch (error) {
    res.status(400).json({
      ok: false,
      info: error
    })
  }
})

router.get("/users/:_id", verifyToken, async (req, res) => {

  const { _id } = req.params;
  try {
    let services = [getUserController(_id)]

    let [userData] = await Promise.all(services.map(service =>
      service.catch(err => {
        console.log(err)
        return {
          ok: false,
          info: err
        }
      })
    ))
    res.status(200).json({
      ok: true,
      info: userData
    })
  }
  catch (error) {
    res.status(400).json({
      ok: false,
      info: error
    })
  }
});

router.put("/users/:_id", verifyToken, async (req, res) => {

  const { _id } = req.params;
  try {
    let services = [deleteUserInDb(_id)]

    let [userData] = await Promise.all(services.map(service =>
      service.catch(err => {
        console.log(err)
        return {
          ok: false,
          info: err
        }
      })
    ))
    res.status(200).json({
      ok: true,
      info: userData
    })
  }
  catch (error) {
    res.status(400).json({
      ok: false,
      info: error
    })
  }
});

router.post("/useredit/:_id", async (req, res) => {
  const { _id } = req.params;
  const { email, shkUsername, playerLevel, admin, country } = req.body
  try {
    let services = [updateUserInDb(_id, email, shkUsername, playerLevel, admin, country )]
    let [userData] = await Promise.all(services.map(service =>
      service.catch(err => {
        console.log(err)
        return {
          ok: false,
          info: err
        }
      })
    ))
    res.status(200).json({
      ok: true,
      info: userData
    })
  }
  catch (error) {
    res.status(400).json({
      ok: false,
      info: error
    })
  }
});

router.delete("/users/:_id", async (req, res) => {

});




router.get("/playerData/:playerName", verifyToken, async (req, res) => {


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
router.post("/player", verifyToken, async (req, res) => {
  newPlayer(req, res);
});

module.exports = router;
