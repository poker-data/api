const { newPlayeCreatorInDB, findPlayersInDB } = require('../utils');

const newPlayerController = async (req) => {
  try {
    const newPlayer = await newPlayeCreatorInDB(req);
    return newPlayer;

  } catch (error) {
    return error;
  }
}

const findPlayersController = async () => {

try {
  const players = await findPlayersInDB();
  return players;

}
catch (error) {
    return error;
    }
}

module.exports = {
    newPlayerController,
    findPlayersController
}