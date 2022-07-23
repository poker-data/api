const config = require('config');
const axios = require('axios');
var parseString = require('xml2js').parseString;
const { newStatsCreator } = require('../utils/creators');
const { apiPlayerStatistics  } = require('../utils/apiRequest');

const playerStatsController = async (req) => {
    let playerName = req.params.playerName;

    try {
            let playerStats = await apiPlayerStatistics(playerName);
            let stats = playerStats
            let newStats = newStatsCreator(playerName, stats);
            return newStats;

    } catch (error) {
        console.log(error)
    }

}


module.exports = {
    playerStatsController,
}