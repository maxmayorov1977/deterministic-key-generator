var config = require('./config/dev.json')
const express = require('express')
const app = express()
app.use(express.urlencoded())
const mongo = require('./mongo')
const crypto = require('./crypto')
fs = require('fs');

app.use((req, res, next) => {
    var ipaddr = req.connection.remoteAddress.split(':')
    var date = Math.floor(new Date() / 1000)
    const request = {
      date: date, ipaddr: ipaddr[3]
    }
    if (config.MONGO.USE == 1){
      mongo.insert(request)
    }
    next()
})

app.use((req, res, next) => {
    if (req.header('API-TOKEN') == config.API.TOKEN){
        next()
    }
    else{
        res.json({
           result: "invalid token"
       })
   }
})

app.get("/mnemonic", (req, res) => {
    answer = crypto.mnemonic()
    res.json({
       result: "ok",
       mnemonic: answer
   })
})

app.get("/bitcoinWallet", (req, res) => {
    fs.readFile('/etc/mnemonic', 'utf8', function (err, mnemonic){
        if (err) {
            return console.log(err)
        }
        if (mnemonic){
            answer = crypto.bitcoinWallet(mnemonic, req.body.id)
            res.json({
                result: "ok",
                wallet: answer
            })
        }
        else{
            res.json({
                result: "error",
                message: 'something went wrong'
            })
        }
    })
})

app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).send("Something broke!")
})

app.listen(config.API.PORT, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${config.API.PORT}`)
})
