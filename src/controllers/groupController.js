const { findGroupsInDB, newGroupCreatorInDB } = require('../utils')

const getGroupController = async () => {
    try {
        const groupList = await findGroupsInDB();
        return groupList;
    } catch (error) {
        return error
    }
}

const setGroupController = async (req) => {

    const body = req.body;
    try {
      const newGroup = await newGroupCreatorInDB(body);
      return newGroup;
  
    } catch (error) {
      return error;
    }
  }

module.exports = {
    getGroupController,
    setGroupController
}