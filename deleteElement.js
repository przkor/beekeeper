const MongoClient = require("mongodb").MongoClient;
const mongodb = require("mongodb");
const url = "mongodb://localhost:27017";

module.exports = {
  delete: function (username, id,collection, callback) {
    const client = MongoClient(url)
    client.connect(function (err, db) {
    const dbcon = db.db(username);
    dbcon.collection(collection).deleteOne(
      {
        _id: new mongodb.ObjectID(id),
      },
      function (err, result) {
        client.close();
        if (err === null) {
          callback({deletedNumber:result.deletedCount});
        } 
        else {
          callback(false);
        }
      }
    )
  })
  }
};
