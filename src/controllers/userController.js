const { newUserCreatorInDB, findUserInDbById, deleteUser } = require('../utils/index');
const { loginUser } = require('../utils/index');
const { updateUser } = require('../utils/updaters');
 

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
    const { email, password } = req.body;
    if (!email || !password) return false;
    const token = await loginUser(req);
    return token;
  } catch (error) {
    return error
  }
}

const getUserController = async (req) => {
  try {
    const userList = await findUserInDbById(req);
    return userList
  } catch(error){
    return error
  }
}

const deleteUserInDb = async (req) => {
  try {
    const userDelete = await deleteUser(req)
    return userDelete
  } catch (error) {
    return error
  }
}

const updateUserInDb = async (_id,email, shkUsername, playerLevel, admin, country, name ) => {
  try {
    const userUpdated = updateUser(_id, email, shkUsername, playerLevel, admin, country, name )   
    return userUpdated
  } catch (error) {
    return error
  }

}




module.exports = {
    newUserController,
    loginUserController,
    getUserController,
    deleteUserInDb,
    updateUserInDb
}