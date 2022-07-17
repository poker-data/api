const playerStatsController = require("../models/playerStatistics");

const newTempPlayerStats = async ( tempStats, playerName ) => {
   
    try {
        const playerStatistics = new playerStatsController({
            tempStats,
            playerName
        })
        playerStatistics.save((err, dateDB) => {
            if (err) {
                return err
            }
            console.log(dateDB);
            console.log("PlayerStatistics created");
            return dateDB
        })
   
    }catch (error) {
        console.log(error)
    }

}


module.exports = {
    newTempPlayerStats,
}