const playerStatistics = require("../models/playerStatistics");
const Player = require("../models/player");
const roomStatistics = require("../models/roomStatistics");
const Group = require("../models/group");
const { startSession } = require("../models/roomStatistics");

const newStatsCreatorInDB = async (playerName, stats) => {

  try {

    const newStats = new playerStatistics({
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

const newRoomStatsCreatorInDB = async (stats) => {

  try {

    const roomStats = new roomStatistics({
      username: stats.username,
      room: stats.room,
      profile: stats.profile,
      profit: stats.profit,
      avprofit: stats.avprofit,
      totalroi: stats.totalroi,
      avroi: stats.avroi,
      activedays: stats.activedays,
      avgamesday: stats.avgamesday,
      ability: stats.ability,
      turbo: stats.turbo,
      hyper: stats.hyper,
      itmpercent: stats.itmpercent,
      reqbankroll: stats.reqbankroll,
      winningdays: stats.winningdays,
      losingdays: stats.losingdays,
    });
    const response = await roomStats.save();
    //console.log(response, 'saving to db');
    return response

  } catch (err) {

    console.log(err, 'error saving to db');
  }
}

const newGroupCreatorInDB = async ({groupName}) => {
console.log(groupName, 'groupname')
  try {
   
    const newGroup = new Group({
      groupName,
    });
    const response = await newGroup.save();
    console.log(response);
    return response;
  } catch (err) {
    console.log(err, 'error saving group to db');
    return err
  }
}

const newPlayerCreatorInDB = async (req) => {
  const {
    playerName,
    shkUsername,
  } = req.body;

  try {

    let newPlayer = new Player({
      playerName,
      shkUsername,
    });
    const response = await newPlayer.save();
    console.log(response);
    return response;
  } catch (err) {
    console.log(err, 'error saving user to db');
    return err
  }
}


module.exports = {
  newStatsCreatorInDB,
  newPlayerCreatorInDB,
  newRoomStatsCreatorInDB,
  newGroupCreatorInDB,
}