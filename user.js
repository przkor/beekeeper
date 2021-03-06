var MongoClient = require("mongodb").MongoClient;
var assert = require("assert");
var url = "mongodb://localhost:27017";
var datacollection = "user";

module.exports = {
  signup: function (name, email, password, callback) {
    MongoClient.connect(url, function (err, db) {
      const textToSplit = email.split("@");
      const dbName = textToSplit[0];
      const dbcon = db.db(dbName);
      dbcon.collection(datacollection).insertOne(
        {
          name: name,
          email: email,
          password: password,
        },
        function (err, result) {
          assert.equal(err, null);
          console.log("Saved the user sign up details.");
          if (result == null) {
            console.log("Nie dodano użytkownika");
            callback(false);
          } else {
            console.log("Dodano użytkownika");
            callback(true);
          }
        }
      );
    });
  },
  validateSignIn: function (username, password, callback) {
    MongoClient.connect(url, function (err, db) {
      const textToSplit = username.split("@");
      const dbName = textToSplit[0];
      const dbcon = db.db(dbName);
      dbcon
        .collection(datacollection)
        .findOne({ email: username, password: password }, function (
          err,
          result
        ) {
          if (result == null) {
            console.log("returning false");
            callback(false);
          } else {
            console.log("returning true");
            callback(true);
          }
        });
    });
  },
};
