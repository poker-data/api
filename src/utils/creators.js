const playerStatistics = require("../models/playerStatistics");
const Player = require("../models/player");


const newStatsCreatorInDB = async (playerName, stats) => {

  try {

    let newStats = new playerStatistics({
      tempStats: stats,
      playerName,
    });
    const response = await newStats.save();
    //console.log(response, 'saving to db');
    return response

  } catch (err) {

    console.log(err, 'error saving to db');
  }
}

const newPlayeCreatorInDB = async (req) => {
  let {
    playerName,
    shkUsername,
  } = req.body;

  try {

    let newPlayer = new Player({
      playerName,
      shkUsername,
    });
    const response = await newPlayer.save();
    //console.log(response);
    return response;
  } catch (err) {
    console.log(err, 'error saving user to db');
    return err
  }
}


module.exports = {
  newStatsCreatorInDB,
  newPlayeCreatorInDB
}