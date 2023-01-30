const { findStakeRangeInDB, newStakeRangeCreatorInDB, updateStakeRangeInDB } = require('../utils')

const getStakeRangeController = async () => {
    try {
        const stakeRangeList = await findStakeRangeInDB();
        return stakeRangeList;
    } catch (error) {
        return error
    }
}

const setStakeRangeController = async (req) => {

    const body = req.body;
    try {
      const newStakeRange = await newStakeRangeCreatorInDB(body);
      return newStakeRange;
  
    } catch (error) {
      return error;
    }
  }

const updateStakeRangeController = async (_id, level, stakeRange ) => {
    try {
      const stakeRangeUpdated = updateStakeRangeInDB(_id, level, stakeRange)   
      return stakeRangeUpdated
    } catch (error) {
      return error
    }
  
  }  

module.exports = {
    getStakeRangeController,
    setStakeRangeController,
    updateStakeRangeController,
}