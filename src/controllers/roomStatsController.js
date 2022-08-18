const { findRoomStatsInDB } = require('../utils');
const { newRoomStatsCreatorInDB } = require('../utils');



const setRoomStatsController = async (req) => {

    let body = req.body;

    try {
      const roomStats = await newRoomStatsCreatorInDB(body);
      return roomStats;
  
    } catch (error) {
      return error;
    }
  }


const findRoomStatsController = async () => {

    try {
      const roomData = await findRoomStatsInDB();
      return roomData;
    
    }
    catch (error) {
        return error;
        }
    }


module.exports = {
    findRoomStatsController,
    setRoomStatsController,
}