const { newUserCreatorInDB, findUserInDbById } = require('../utils/index');
const { loginUser } = require('../utils/index');
 

const newUserController = async (req) => {
  try {
    const newUser = await newUserCreatorInDB(req);
    return newUser;

  } catch (error) {
    return error;
  }
}

const loginUserController = async (req) => {
  try {
    const token = await loginUser(req);
    return token;
  } catch (error) {
    return error
  }
}

const getUserController = async (req) => {
  try{
    const userList = await findUserInDbById(req);
    return userList;
  }catch (error) {
    return error
  }
}



module.exports = {
    newUserController,
    loginUserController,
    getUserController,
}