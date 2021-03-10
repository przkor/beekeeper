const {uri,mongoConstructor} = require("./mongoConfig")
const MongoClient = require("mongodb").MongoClient;
const mongodb = require("mongodb");
const collection = 'treatment'

module.exports = {
  getDrugs: async function (username, callback) {
    const client = MongoClient(uri,mongoConstructor)
    client.connect(function (err, db) {
      const dbcon = db.db(username);
      dbcon.collection(collection, async function (err, collection) {
        await collection.find().toArray(function (err, list) {
          if (err===null)
          {
            client.close();
            callback(list);
          }
          else {
            callback(false)
            client.close();
          }
        });
      });
    });
  },
  addDrug: function (username,data, callback) {
    const {name,producer,dosage} = data
    const client = MongoClient(uri,mongoConstructor)
    client.connect(function (err, db) {
      const dbcon = db.db(username);
      dbcon.collection(collection).insertOne(
        {
          name,
          producer,
          dosage
        },
        function (err, result) {
          client.close();
          const insertedCount = result.insertedCount
          const insertedId = result.insertedId
          if (err === null) {
            callback({insertedCount,insertedId});
          } else {
            callback({insertedCount});
          }
        }
      );
    });
  },

  updateDrugs: function (username,data,callback) {
    const {_id,name,producer,dosage} = data
    const client = MongoClient(uri,mongoConstructor)
    client.connect(function (err, db) {
     const dbcon = db.db(username);
      dbcon
        .collection(collection)
        .updateOne(
          { _id: mongodb.ObjectID(_id) },
          { $set: { name: name, producer: producer, dosage:dosage } },
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
 
  deleteDrug: function (username, id, callback) {
    const client = MongoClient(uri,mongoConstructor)
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
