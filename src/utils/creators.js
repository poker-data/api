const playerStatistics = require("../models/playerStatistics");


const newStatsCreatorInDB = async (playerName, stats) => {

    try {

        let newStats = new playerStatistics({
            tempStats: stats,
            playerName,
        });
        const response = await newStats.save();
        //console.log(response, 'saving to db');
        return response

    } catch (err) {

        console.log(err, 'error saving to db');
    }
}

module.exports = {
    newStatsCreatorInDB,
}