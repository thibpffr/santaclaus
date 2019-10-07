var express = require('express')
var bodyParser = require('body-parser')
var app = express()

const port = 8081

const checkModel = model => {
    if (!model) {
        console.error("Empty model!")
        return false
    }

    if (!model.gifts || !model.gifts.length) {
        console.error("No gifts!")
        return false
    }

    return true
}

const areStupidReindeerHungry = () => Math.floor(Math.random() * Math.floor(5)) === 0

const sendGift = giftNumber => new Promise(resolve => {
    setTimeout(() => {
        console.log("Sending gift #" + giftNumber)
        resolve()
    }, 500)
})

const sendGifts = async gifts => {
    for (let i = 0; i < gifts.length; ++i) {
        await sendGift(i + 1)
    }
}

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(function(_req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", "POST")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

app.post('/', async (req, res) => {
    const model = req.body
    let response = ''

    console.log('Received POST request')
    console.log(model)
    try
    {
        let statusCode

        if (checkModel(model)) {
            console.log("Received model with " + model.gifts.length + " gifts!")
            if (areStupidReindeerHungry()) {
                console.error("Stupid reindeers!!!")
                statusCode = 451
            } else {
                await sendGifts(model.gifts)
                statusCode = 204
            }
        } else {
            statusCode = 400
        }

        res.writeHead(statusCode, { "Content-Type": "text/json" })
    } catch (ex) {
        console.error("Exception: ", ex)
        res.writeHead(500, { "Content-Type": "text/json" })
    }

    res.end(response)
})

var server = app.listen(port, function () {
    var port = server.address().port

    console.log("Server listening on port " + port + "...")
})