const dotenv = require('dotenv');

dotenv.config();

const MongoClient = require('mongodb').MongoClient;

let database;

const InitDb = (callback) => {

    if (database) {
        console.log('Db is already running');
        return callback(null, database);
    }
    MongoClient.connect(process.env.MONGODB_URL)
      .then((client) => {
        database = client;
        callback(null, database);
      })
      .catch((err) => {
        callback(err);
      });
}

const getDatabase = () => {
    if (!database) {
        throw Error('Db not running')
    }
    return database;
}

module.exports = {
    InitDb,
    getDatabase
};