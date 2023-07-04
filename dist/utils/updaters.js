const User = require('../models/user');
const deleteUser = async id => {
  try {
    const userDeleted = await User.findOneAndUpdate({
      _id: id
    }, {
      $set: {
        delete: true
      }
    });
    return userDeleted;
  } catch (error) {
    return error;
  }
};
const updateUser = async (_id, email, shkUsername, playerLevel, admin, country, name) => {
  try {
    const userEdit = await User.findOneAndUpdate({
      _id: _id
    }, {
      $set: {
        name: name,
        email: email,
        shkUsername: shkUsername,
        admin: admin,
        playerLevel: playerLevel,
        country: country
      }
    });
  } catch (error) {
    return error;
  }
};
module.exports = {
  deleteUser,
  updateUser
};