const User = require('../models/user')
const StakeRange = require('../models/stakeRange')
const NetworksByZone = require('../models/networksByZone')
const ExcludedKeywords = require('../models/excludedKeywords')

const deleteUser = async (id) => {
    try {
       const userDeleted =  await User.findOneAndUpdate({ _id : id}, {$set: {delete: true}})
        return userDeleted
      } catch (error) {
        return error
      }
}

const updateUser = async (_id,email, shkUsername, playerLevel, admin, country, name ) => {
    
    try {
        const userEdit = await User.findOneAndUpdate({ _id : _id }, {$set : {
            name: name,
            email : email,
            shkUsername : shkUsername,
            admin : admin,
            playerLevel : playerLevel,
            country: country}})
        return userEdit;
      
    } catch (error) {
      return error
    }
}

const updateStakeRangeInDB = async (_id, level, stakeRange ) => {
    
  try {
      let stakeRangeEdit = await StakeRange.findOneAndUpdate({ _id : _id }, {$set : {
        level: level,
        stakeRange: stakeRange,
     }})
    return stakeRangeEdit;
  } catch (error) {
    return error
  }
}

const updateNetworksByZoneInDB = async (_id, zones, networks ) => {
    
  try {
      let networksByZoneEdit = await NetworksByZone.findOneAndUpdate({ _id : _id }, {$set : {
        zones: zones,
        networks: networks,
     }})
    return networksByZoneEdit;
  } catch (error) {
    return error
  }
}


const updateExcludedKeywordsInDB = async (_id, keyword ) => {
    
  try {
      let excludedKeywordsEdit = await ExcludedKeywords.findOneAndUpdate({ _id : _id }, {$set : {
        keyword: keyword,
     }})
    return excludedKeywordsEdit;
  } catch (error) {
    return error
  }
}

module.exports = {
    deleteUser,
    updateUser,
    updateStakeRangeInDB,
    updateNetworksByZoneInDB,
    updateExcludedKeywordsInDB,
}