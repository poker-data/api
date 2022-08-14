const { newStatsCreatorInDB, newPlayeInDB } = require('../utils/creators');
const { apiPlayerStatistics, apiUserMetaData, setApiPlayerFilters} = require('../utils/apiRequest');

const playerStatsController = async (req) => {
    let playerName = req.params.playerName;
    let body = req.body;
    const dateFrom = body.dateFrom || null;
    const dateTo = body.dateTo || null;
    console.log(body);

    try {

        const apiPlayerData = await apiPlayerStatistics(body);
        
       // const newPlayerDbStats = await newStatsCreatorInDB(playerName, JSON.stringify(apiPlayerData));

        //return apiStats; para devolver el obj de la api completo

        return apiPlayerData; // para devolver el obj de la DB

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
    const body = req.body;
   
    try {
        const setFilters = await setApiPlayerFilters( body );
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