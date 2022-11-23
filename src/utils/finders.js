const Player = require("../models/player");
const RoomStats = require("../models/roomStatistics");
const Group = require("../models/group");
const User = require('../models/user')

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
     // console.log("llegue")
      const groupList = await Group.find();
      //console.log(groupList, "groupList")
      return groupList;
      
    } catch (error) {
      return error
    }
}

const findUserInDb = async (id) => {
  
  if(id){
    try {
      const userList = await User.find({_id : id})
      return userList
    } catch (error) {
      return error
    }
  } else {
    try {
      const userList = await User.find()
      return userList
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
  findUserInDbById
}