const MongoClient = require("mongodb").MongoClient;
const mongodb = require("mongodb");
const url = "mongodb://localhost:27017";
const table = 'quens'

module.exports = {
  getQuens: async function (username, callback) {
    const client = MongoClient(url)
    client.connect(function (err, db) {
      const dbcon = db.db(username);
      dbcon.collection(table, async function (err, collection) {
        await collection.find().toArray(function (err, list) {
          if (err===null)
          {
            client.close();
            callback(list);
          }
          else {callback(false)}
        });
      });
    });
  },
  addQuen: function (username,quenData, callback) {
    const {line,delivery} = quenData
    const client = MongoClient(url)
    client.connect(function (err, db) {
      const dbcon = db.db(username);
      dbcon.collection(table).insertOne(
        {
          line: line,
          delivery: delivery,
        },
        function (err, result) {
          client.close();
          const insertedCount = result.insertedCount
          const insertedId = result.insertedId
          const quenData = {_id:insertedId, line,delivery}
          if (err == null) {
            callback({insertedCount,quenData});
          } else {
            callback({insertedCount});
          }
        }
      );
    });
  },
 
  deleteQuen: function (username, id, callback) {
    const client = MongoClient(url)
    client.connect(function (err, db) {
    const dbcon = db.db(username);
    dbcon.collection(table).deleteOne(
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
