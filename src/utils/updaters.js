const User = require('../models/user')
const StakeRange = require('../models/stakeRange')

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


module.exports = {
    deleteUser,
    updateUser,
    updateStakeRangeInDB,

}