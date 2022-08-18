const Player = require("../models/player");
const RoomStats = require("../models/roomStatistics");

const findPlayersInDB = async () => {

  try {
    const playerList = await Player.find();
    const playerEnabledList = playerList.filter(player => player.delete === false);
    return playerEnabledList;
  } catch (error) {
    return error
  }
}

const findRoomStatsInDB = async () => {

  try {
    const roomList = await RoomStats.find();
    return roomList;
    
  } catch (error) {
    return error
  }
}

module.exports = {
  findPlayersInDB,
  findRoomStatsInDB
}