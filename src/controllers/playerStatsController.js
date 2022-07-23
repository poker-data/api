const { newStatsCreatorInDB } = require('../utils/creators');
const { apiPlayerStatistics } = require('../utils/apiRequest');

const playerStatsController = async (req) => {
    let playerName = req.params.playerName;

    try {
        const playerData = await apiPlayerStatistics(playerName);
        const apiStats = playerData
        const newPlayerDbStats = await newStatsCreatorInDB(playerName, JSON.stringify(apiStats));
        console.log(newPlayerDbStats, 'in controller');
        //return newPlayerDbStats; para devolver el dato db con id y playerName
        return newPlayerDbStats; // para devolver el obj de la api completo

    } catch (error) {
        console.log(error)
    }

}


module.exports = {
    playerStatsController,
}