const Player = require("../models/player");
const RoomStats = require("../models/roomStatistics");
const Group = require("../models/group");
const User = require('../models/user');
const StakeRange = require('../models/stakeRange');
const NetworksByZone = require('../models/networksByZone');

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


const findGroupsInDB = async () => {
    try {
      const groupList = await Group.find();
      return groupList;
      
    } catch (error) {
      return error
    }
}

const findStakeRangeInDB = async () => {
  try {
    const stakeRangeList = await StakeRange.find();
    return stakeRangeList;
    
  } catch (error) {
    return error
  }
}

const findNetworksByZoneInDB = async () => {
  try {
    const networksByZoneList = await NetworksByZone.find();
    return networksByZoneList;
    
  } catch (error) {
    return error
  }
}



const findUserInDb = async (id) => {
  
  if(id){
    try {
      const userList = await User.find({_id : id})
      return userList.filter(d => d.delete !== true)
    } catch (error) {
      return error
    }
  } else {
    try {
      const userList = await User.find()
      return userList.filter(d => d.delete !== true)
    } catch (error) {
      return error
    }
  }

}

const findUserInDbById = async (id) => {
  try {
    const userList = await User.find({ _id : id})
    return userList
  } catch (error) {
    return error
  }
}

module.exports = {
  findPlayersInDB,
  findRoomStatsInDB,
  findGroupsInDB,
  findUserInDb,
  findUserInDbById,
  findStakeRangeInDB,
  findNetworksByZoneInDB,
}