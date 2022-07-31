const Player = require("../models/player");


const findPlayersInDB = async () => {

  try {
    const playerList = await Player.find();
    const playerEnabledList = playerList.filter(player => player.delete === false);
    return playerEnabledList;
  } catch (error) {
    return error
  }
}

module.exports = {
  findPlayersInDB
}