'use strict'

const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://carlos29:bmsgV9Umue8l2qQ5@cluster0-8hsgm.mongodb.net/BowheadHealth?retryWrites=true&w=majority";
const uri = "mongodb://mongo:27017/local"
const dbName = "local"
const client = new MongoClient(uri, { useUnifiedTopology: true, useNewUrlParser: true })

class MongoConection {

  countElements(collectionName) {

    return new Promise((resolve, reject) => {

      client.connect( async (err) => {
        if (err) reject (err)
        let collection = client.db(dbName).collection(collectionName)
        collection.count(function (err, count) {
          client.close();
          return err ? reject(err) : resolve(count);
        });      
      });

    })

  }

  getElements(collectionName) {
    return new Promise((resolve, reject) => {

      client.connect( async (err) => {
        if (err) reject (err)
        let collection = client.db(dbName).collection(collectionName)
        collection.find()
          .toArray(function(err, data) {
            client.close();
            return err ? reject(err) : resolve(data);
          });
      });

    })
  }
    
  inser(collectionName, element) {
    return new Promise((resolve, reject) => {

      client.connect( async (err) => {
        if (err) reject (err)
        let collection = client.db(dbName,collectionName).collection(collectionName)
        let insertedElement = collection.insertOne(element)
          .then( response => {
            client.close();
            return response;
          })
        resolve(insertedElement)
      });

    })
  }

}

module.exports = MongoConection
