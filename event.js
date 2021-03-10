const {uri,mongoConstructor} = require("./mongoConfig")
let MongoClient = require("mongodb").MongoClient;
let mongodb = require("mongodb");


module.exports = {
  addEvent: function (username, title, subject, callback) {
    const client = MongoClient(uri, mongoConstructor)
    client.connect(function (err, db) {
      const dbcon = db.db(username);
      dbcon.collection("event").insertOne(
        {
          title: title,
          subject: subject,
        },
        function (err, result) {
          client.close();
          if (err == null) {
            callback(true);
          } else {
            callback(false);
          }
        }
      );
    });
  },
  getEventWithId: function (username, id, callback) {
    const client = MongoClient(uri, mongoConstructor)
    client.connect(function (err, db) {
      const dbcon = db.db(username);
      dbcon.collection("event").findOne(
        {
          _id: new mongodb.ObjectID(id),
        },
        function (err, result) {
          client.close();
          if (err == null) {
            callback(result);
          } else {
            callback(false);
          }
        }
      );
    });
  },
  updateEvent: function (username, id, title, subject, callback) {
    const client = MongoClient(uri, mongoConstructor)
    client.connect(function (err, db) {
      const dbcon = db.db(username);
      dbcon
        .collection("event")
        .updateOne(
          { _id: new mongodb.ObjectID(id) },
          { $set: { title: title, subject: subject } },
          function (err, result) {
            client.close();
            if (err == null) {
              callback(true);
            } else {
              callback(false);
            }
          }
        );
    });
  },
  getEvents: function (username, callback) {
    const client = MongoClient(uri, mongoConstructor)
    client.connect(function (err, db) {
      const dbcon = db.db(username);
      dbcon.collection("event", function (err, collection) {
        collection.find().toArray(function (err, list) {
          client.close();
          callback(list);
        });
      });
    });
  },

  deleteEvent: function (username, id, callback) {
    const client = MongoClient(uri, mongoConstructor)
    client.connect(function (err, db) {
      const dbcon = db.db(username);
      dbcon.collection("event").deleteOne(
        {
          _id: new mongodb.ObjectID(id),
        },
        function (err, result) {
          client.close();
          if (err == null) {
            callback(true);
          } else {
            callback(false);
          }
        }
      );
    });
  },

  getProfile: function (username, session_email, callback) {
    const client = MongoClient(uri, mongoConstructor)
    client.connect(function (err, db) {
      const dbcon = db.db(username);
      dbcon.collection("user").findOne(
        {
          email: session_email,
        },
        function (err, result) {
          client.close();
          if (err == null) {
            callback(result);
          } else {
            callback(false);
          }
        }
      );
    });
  },
};
