const {uri,mongoConstructor} = require("./mongoConfig")
const MongoClient = require("mongodb").MongoClient;
const tableDB = "user";

module.exports = {
  updateProfile: function (username, name, password, callback) {
    const client =  MongoClient(uri,mongoConstructor)
    client.connect(function (err, db) {
     const dbcon = db.db(username);
      dbcon
        .collection(tableDB)
        .updateOne(
          { name: name },
          { $set: { name: name, password: password } },
          function (err, result) {
            client.close()
            if (err == null) {
              callback(true);
            } else {
              callback(false);
            }
          }
        );
    });
  },
};
