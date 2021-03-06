const MongoClient = require("mongodb").MongoClient;
const mongodb = require("mongodb");
const url = "mongodb://localhost:27017";
const collection = 'apiary'

module.exports = {
  getApiary: function (username, callback) {
    const client = MongoClient(url)
    client.connect(function (err, db) {
      const dbcon = db.db(username);
      dbcon.collection(collection, function (err, collection) {
        collection.find().toArray(function (err, list) {
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
  addApiary: function (username,data, callback) {
    const {name,location} = data
    const client = MongoClient(url)
    client.connect(function (err, db) {
      const dbcon = db.db(username);
      dbcon.collection(collection).insertOne(
        {
          name: name,
          location: location,
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

  updateApiary: function (username,data,callback) {
    const {_id,name,location} = data
    const client = MongoClient(url)
    client.connect(function (err, db) {
     const dbcon = db.db(username);
      dbcon
        .collection(collection)
        .updateOne(
          { _id: mongodb.ObjectID(_id) },
          { $set: { name: name, location:location } },
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
 
  deleteApiary: function (username, id, callback) {
    const client = MongoClient(url)
    client.connect(function (err, db) {
      const dbcon = db.db(username);
      const query = {apiary:id,isActive:true}
      dbcon.collection("hives").countDocuments(query,function (err, result) {
        if (err === null) {
          if (parseInt(result)===0) {
          dbcon.collection("apiary").deleteOne(
            {
              _id: new mongodb.ObjectID(id),
            },
            function (err, result) {
              const count = result.deletedCount
              client.close();
              if (err === null) {
                console.log(`Result: ${result}`)
                callback({ack:true, deletedNumber:count});
              } else {
                callback(false);
              }
            }
          );
        } else {
          client.close();
          callback({ack:true, deletedNumber:0});
        }
      }
      else {
        client.close();
        callback(false);
      }
    })
  })
},
    
   
      /*
      dbcon.collection("apiary").deleteOne(
        {
          _id: new mongodb.ObjectID(id),
          hivesNumber: 0
        },
        function (err, result) {
          const count = result.deletedCount
          if (err === null) {
            console.log(`Result: ${result}`)
            callback({ack:true, deletedNumber:count});
          } else {
            callback(false);
          }
        }
      );
      */


};
