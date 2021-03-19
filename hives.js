const {uri,mongoConstructor} = require("./mongoConfig")
const MongoClient = require("mongodb").MongoClient;
const mongodb = require("mongodb");
const dbcollection = 'hives'

module.exports = {
  /*
  getHivesNumbers: function (username, callback) {
    const client =  MongoClient(uri,mongoConstructor)
    async function run() {
      try {
        await client.connect();
        const database = client.db(username)
        const collection = database.collection(dbcollection)
        const query = { isActive:false}
        const options = { projection: {number:1} }
        const count = await collection.estimatedDocumentCount()
        if (count===0) {callback({number:1,count:0})}
        else {
          collection.findOne(query,options, function (err, result) {
            
            if (err === null) {
              console.log(`Jestem w err===null`)
              console.log(`Result:${result}`)
              if (result) { callback({number:result, count:count});}
              else { callback({number:1, count:count}); }
            }
            else {
              console.log(`Result:${result}`)
              callback({number:count+1, count:count});
            }
          }
          );
        }
      } 
      finally {
        await client.close();
      }
    }
    run().catch(console.dir)
    
  },
  */
  
  getHivesNumbers: function (username, callback) {
    const query = { isActive: false};
    const options = {
      // sort matched documents in descending order by rating
      //sort: { rating: -1 },
      // Include only the `title` and `imdb` fields in the returned document
      projection: { number: 1},
    };
    MongoClient.connect(uri, mongoConstructor, async function (err, db) {
      if (err) {console.log('błąd połączenia z bazą')}
      else {
        const dbcon = db.db(username);
        const count = await dbcon.collection(dbcollection).estimatedDocumentCount()+1
        dbcon.collection(dbcollection).findOne(query,options
          ,
          function (err, result) {
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
    });
  },

  getHivesAmountInApiary: async function (username,id, callback) {   
    try {
      const client =  new MongoClient(uri,mongoConstructor)
      const query = {
        apiary:id,
        isActive:true
      }
      await client.connect(function (err, db) {
        if (err) {console.log(`błąd połączenia z bazą`)}
        else {
          const dbcon = db.db(username);
          dbcon.collection(dbcollection, function (err, collection) {
            if (err) {console.warn(`błąd przy połączeniu z kolekcją danych`)}
            else {
              collection.countDocuments(query,function (err, result) {
                client.close();
                if (err === null) {callback({result})}
                else { callback(false) };
              }
           )}        
          } 
        )};
        }) 
      } catch (e) {
        console.error(e);
      } 
  },

  getHives: function (username,apiaryID,callback) {
    let query
    if(apiaryID==='all') { query = { isActive:true}}
    else { query = { isActive:true , apiary:apiaryID}}
    const client =  MongoClient(uri,mongoConstructor)
    client.connect(function (err, db) {
      const dbcon = db.db(username);
      dbcon.collection(dbcollection, function (err, collection) {
        if (err) {console.warn(`Błąd połączenia z bazą`)}
        else {
          collection.find(query).toArray(function (err, result) {
            client.close();
            if (err===null)
            {
              if (result!==undefined) {callback(result);}
              else {callback(false)} 
            }
            else {callback(false)}
          });
        } 
      });
    });
  },

  /*
   getHives: function (username,apiaryID, callback) {
    const client =  MongoClient(uri,mongoConstructor)
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
          console.log(`Result: ${result}`)
          if (err === null) { 
            if (result!==undefined) {callback(result)}  
            else {callback(false)}
            
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

  */

  updateHive: function (username,data,callback) {
    const {_id,number,type,mother,motherYear,power,status,apiary} = data
    const client =  MongoClient(uri,mongoConstructor)
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

  addHive: function (username,hive,callback) {
    const {number,type,mother,motherYear,power,status,apiary,isActive}=hive
    const client =  MongoClient(uri,mongoConstructor)
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
    const client =  MongoClient(uri,mongoConstructor)
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

  migrateHives: function (username,data,apiaryID,callback) {

  
let bulkArr = [];
for (const i of data) {
    bulkArr.push({
        updateOne: {
            "filter": { number : i },
            "update": { '$set': { apiary : apiaryID } }
        }
    })
}

//let updateResult = await MongooseModel.bulkWrite( bulkArr, { ordered : false }) 
/** Passing { ordered : false } to make sure update op doesn't fail if updating one document in the middle fails, Also bulkWrite returns write result check documentation for more info */

const client =  MongoClient(uri,mongoConstructor)
     client.connect(function (err, db) {
     const dbcon = db.db(username);
       dbcon.collection(dbcollection).bulkWrite(bulkArr, { ordered : false },function (err, result) {
        if (err === null) {
          callback(true);
        } else {
          callback(false);
        }
        client.close()
      }
      )
    })
   // console.log('matchedCount ::', updateResult.matchedCount, 'modifiedCount ::', updateResult.modifiedCount)
   //client.close()
 
    
  },

};
