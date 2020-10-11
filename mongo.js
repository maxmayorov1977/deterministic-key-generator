const config = require('./config/app.json')
const mongo = require('mongodb').MongoClient

mongo.insert = function(request){
    mongo.connect(process.env.URL || config.MONGO.URL, {useNewUrlParser: true}, (err, client) => {
    if (err){
        console.error(err)
        return
    }
        const db = client.db('wallet')
        const collection = db.collection('requests')
        collection.insertOne({request}, (err, result) => {
        })
    })
}

module.exports = mongo
