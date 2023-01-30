const { findNetworksByZoneInDB, newNetworksByZoneCreatorInDB, updateNetworksByZoneInDB } = require('../utils')

const getNetworksByZoneController = async () => {
    try {
        const NetworksByZoneList = await findNetworksByZoneInDB();
        return NetworksByZoneList;
    } catch (error) {
        return error
    }
}

const setNetworksByZoneController = async (req) => {

    const body = req.body;
    try {
      const newNetworksByZone = await newNetworksByZoneCreatorInDB(body);
      return newNetworksByZone;
  
    } catch (error) {
      return error;
    }
  }

const updateNetworksByZoneController = async (_id, zones, networks ) => {
    try {
      const NetworksByZoneUpdated = updateNetworksByZoneInDB(_id, zones, networks)   
      return NetworksByZoneUpdated
    } catch (error) {
      return error
    }
  
  }  

module.exports = {
    getNetworksByZoneController,
    setNetworksByZoneController,
    updateNetworksByZoneController,
}