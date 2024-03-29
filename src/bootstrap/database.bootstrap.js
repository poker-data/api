var mongoose = require("mongoose");
const HOSTS_RX =
  /(mongodb(?:\+srv|)):\/\/(?: (?:[^:]*) (?: : ([^@]*) )? @ )?([^/?]*)(?:\/|)(.*)/;

const getConnectionString = async () => {
  let connectionString ="mongodb+srv://<username>:<password>@bbzlatamapp-api.uool30b.mongodb.net/?retryWrites=true&w=majority"
  const dbPassword = process.env.DATABASE_PASSWORD;
  const dbUser = process.env.DATABASE_USER;
  connectionString = connectionString.replace("<username>", dbUser).replace("<password>", dbPassword);
  console.log("=========== connectionString ===>  " + connectionString + "  ================== ")
  return connectionString;
};

const dbMongoose = () => {
  function disconnect() {
    try {
      mongoose.disconnect;
    } catch (e) {
      console.log("Disconnected from Database", e);
    }
  }
  async function initialize() {
    const connectionString = await getConnectionString();
    console.log(connectionString);
    const cap = connectionString.match(HOSTS_RX);
    if (!cap) {
      console.log(connectionString);
      reject("incorrect mongo connection string");
    }
    const promiseInitialize = new Promise(async (resolve, reject) => {
      mongoose.set("strictQuery", false);
      mongoose
        .connect(connectionString)
        .then(() => {
          console.log("Connection Database successful");
          resolve("Connection Database successful");
        })
        .catch((err) => {
          console.log("there was an error connecting mongoose");
          reject(err);
        });
    });

    return await promiseInitialize;
  }

  return Object.freeze({ initialize, disconnect });
};

module.exports = dbMongoose;
