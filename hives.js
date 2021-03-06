const MongoClient = require("mongodb").MongoClient;
const mongodb = require("mongodb");
const url = "mongodb://localhost:27017";
const dbcollection = 'hives'

module.exports = {
  getHivesNumbers: function (username, callback) {
    const client = MongoClient(url)
    async function run() {
      try {
        await client.connect();
        const database = client.db(username)
        const collection = database.collection(dbcollection)
        const query = { isActive:false}
        const options = { projection: {number:1} }
        const count = await collection.estimatedDocumentCount()+1
        collection.findOne(query,options, function (err, result) {
          if (err === null) {
              if (result) { callback({number:result.number, count:count});}
              else { callback({number:false, count:count}); }
            }
          else {
            callback(false);
          }
        }
        );
      }
      finally {
        await client.close();
      }
    }
    run().catch(console.dir)
    
  },
  /*
  getHivesNumbers: function (username, callback) {
    const query = { isActive: false};
    const options = {
      // sort matched documents in descending order by rating
      //sort: { rating: -1 },
      // Include only the `title` and `imdb` fields in the returned document
      projection: { number: 1},
    };
    MongoClient.connect(url, async function (err, db) {
        const dbcon = db.db(username);
        const count = await dbcon.collection(collection).estimatedDocumentCount()+1
        dbcon.collection(collection).findOne(query,options
          ,
          function (err, result) {
            assert.equal(err, null);
            if (err === null) {
                console.log(`Count : ${count}`)
                if (result) { callback({number:result, count:count});}
                else { callback({number:false, count:count}); }
              }
            else {
              callback(false);
            }
          }
        );
      });
    */

   getHives: function (username,apiaryID, callback) {
    const client = MongoClient(url)
    let query
    async function run() {
      try {
        if(apiaryID==='all') { query = { isActive:true}}
        else { query={ isActive:true , apiary:apiaryID}}
        await client.connect();
        const database = client.db(username)
        const collection = database.collection(dbcollection)
        //const options = {}
        collection.find(query).toArray(function (err, result) {
          if (err === null) {
            callback(result)
          }
          else {
            callback(false);
          }
        })
      }
      finally {
        await client.close();
      }
    }
    run().catch(console.dir)
  },

  updateHive: function (username,data,callback) {
    const {_id,number,type,mother,motherYear,power,status,apiary} = data
    const client = MongoClient(url)
    client.connect(function (err, db) {
     const dbcon = db.db(username);
      dbcon
        .collection(dbcollection)
        .updateOne(
          { _id: mongodb.ObjectID(_id) },
          { $set: { 
            number:number,type:type, mother:mother,motherYear:motherYear,
            power:power,status:status, apiary:apiary} 
          },
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

  getHivesAmountInApiary: function (username,id, callback) {
    const client = MongoClient(url)
    async function run() {
      try {
        await client.connect();
        const database = client.db(username)
        const collection = database.collection(dbcollection)
        const query = {
          apiary:id,
          isActive:true
        }
        await collection.countDocuments(query,function (err, result) {
          if (err === null) {
            console.log(`Result:${result}`)
            callback({result})
            client.close();
          }
          else {
            client.close();
            callback(false);
          }
        })
       /*
        const match = {$match:{apiary:id}}
       const group = {$group:{total:{$sum:1}}}
       await collection.aggregate([match,group],function (err, result) {
        console.log(`Result:${result}`)
        client.close();
        if (err === null) {
          
          callback(result)
        }
        else {
          callback(false);
        }
      })
        */
     
      }
      finally {
        await client.close();
      }
    }
    run().catch(console.dir)
  
  },


getHivesAmountInApiary2: function (username,id,callback) {
  const client = MongoClient(url)
  async function run() {
    try {
      await client.connect();
      const database = client.db(username)
      const collection = database.collection(dbcollection)
      const match = {$match:{isActive:true}}
      const group = {$group:{_id:"$apiary",amount:{$sum:1}}}
      await collection.findOne([match,group]).toArray(function (err, result) {
        client.close();
        if (err === null) {
          callback(result)
        }
        else {
          callback(false);
        }
      })
    }
    finally {
      await client.close();
    }
  }
  run().catch(console.dir)
},

  addHive: function (username,hive,callback) {
    const {number,type,mother,motherYear,power,status,apiary,isActive}=hive
    const client = MongoClient(url)
        client.connect(async function (err, db) {
            const dbcon = await db.db(username);
            const hives = await dbcon.collection(dbcollection)
            const query =  { number: number};
            const isExist = await hives.countDocuments(query)
            if (isExist!==0) {
              hives.updateOne(
                  { number: number},
                  { $set: 
                    { 
                      number: number,
                      type:type,
                      mother:mother,
                      motherYear:motherYear,
                      power:power,
                      status:status,
                      apiary:apiary,
                      isActive:true 
                    } 
                  },
                function (err, result) {
                  client.close()
                  if (err == null) {
                    console.log(result.upsertedIds)
                    callback(result.upsertedIds);
                    
                  } else {
                    callback(false);
                  }
                }
              );
            }
            else {
                hives.insertOne(
                    {
                      number: number,
                      type:type,
                      mother:mother,
                      motherYear:motherYear,
                      power:power,
                      status:status,
                      apiary:apiary,
                      isActive:isActive
                    },
                    function (err, result) {
                       client.close()
                       //const insertedCount = result.insertedCount
                      if (err == null) {
                        callback(result.insertedId);
                      } else {
                        callback(false);
                      }
                    }
                  );

            }
        });
  },
 

  
 
  deleteHive: function (username, hiveID, callback) {
    const client = MongoClient(url)
    client.connect(function (err, db) {
      const dbcon = db.db(username);
      dbcon.collection(dbcollection).updateOne(
        {
          _id: new mongodb.ObjectID(hiveID),

        },
        { $set: { isActive: false } },
        function (err, result) {
          if (err === null) {
            callback(true);
          } else {
            callback(false);
          }
          client.close()
        }
      );
    });
  },

};
