const playerStatistics = require("../models/playerStatistics");


const newStatsCreator = ( playerName, stats ) => {
 
      try {

        let newStats = new playerStatistics({
           playerName,
              stats
          });
          console.log(newStats);
          customer.save((err, newStats) => {
            if (err) {
              console.log(err)
            }
           console.log(newStats)
           return newStats
          });
       
      } catch (err) {
       console.log(error)
      }
}

module.exports = {
    newStatsCreator,
}