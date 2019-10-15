var config = require('./config/dev.json')
const mongo = require('mongodb').MongoClient

module.exports = {
    insert: function(request){
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
}
