const { newStatsCreatorInDB, newPlayerCreatorInDB } = require('../utils/creators');
const { apiPlayerStatistics, apiUserMetaData, setApiPlayerFilters, setApiGroupFilters} = require('../utils/apiRequest');

const playerStatsController = async (req) => {
    let body = req.body;

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
   console.log("body antes de reques",body)
    try {
        const setFilters = await setApiPlayerFilters( body );
        return setFilters
    } catch (error) {
        return error
    }
}

const groupDefaultFiltersFromApi = async(req) => {
    const body = req.body; 
    try {
        const setFilters = await setApiGroupFilters( body );
        return setFilters
    } catch (error) {
        return error
    }
}


module.exports = {
    playerStatsController,
    userMetaData,
    playerFiltersFromApi,
    groupDefaultFiltersFromApi
}