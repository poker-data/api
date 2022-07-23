const { newStatsCreatorInDB } = require('../utils/creators');
const { apiPlayerStatistics } = require('../utils/apiRequest');

const playerStatsController = async (req) => {
    let playerName = req.params.playerName;

    try {
        const apiPlayerData = await apiPlayerStatistics(playerName);
        
        const newPlayerDbStats = await newStatsCreatorInDB(playerName, JSON.stringify(apiPlayerData));
        
        //return apiStats; para devolver el obj de la api completo

        return newPlayerDbStats; // para devolver el obj de la DB

    } catch (error) {
        //console.log(error, 'error in controller');
        return error
    }

}


module.exports = {
    playerStatsController,
}