const { newStatsCreatorInDB, newPlayeInDB } = require('../utils/creators');
const { apiPlayerStatistics, apiUserMetaData, setApiPlayerFilters} = require('../utils/apiRequest');

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

const userMetaData = async(req) => {

    try {
        const apiSharkMetaData = await apiUserMetaData();
        return apiSharkMetaData;

    } catch (error) {
        return error
    }

}

const playerFiltersFromApi = async(req) => {
    let filters = req.query.filter
    let playerName = req.params.playerName
   
    try {
        const setFilters = await setApiPlayerFilters( playerName ,filters );
        return setFilters
    } catch (error) {
        return error
    }
}


module.exports = {
    playerStatsController,
    userMetaData,
    playerFiltersFromApi
}