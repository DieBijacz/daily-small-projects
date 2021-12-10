const express = require('express');
const Datastore = require('nedb')
// const { response } = require('express');
const app = express();
app.listen(3000, () => {console.log('list 3000')})
app.use(express.static('public'))
app.use(express.json({limit: '1mb'}))

ISStempData = []
const ISSpositionsDB = new Datastore('ISSPositions.db')
ISSpositionsDB.loadDatabase()
const timeStamp = Date.now()

app.post('/api', (request, response) => {
    //server req data
    const data = request.body
    data.timeStamp = timeStamp
    //and as response sends this
    response.json(data)
})

app.post('/ISSdata', (req, resp) => {
    const data = req.body
    data.timeStamp = timeStamp
    data.name ? ISSpositionsDB.insert(data) : ISStempData.push(data)
    resp.json(data)
})

app.get('/ISSdataDB', (req, resp) => {
    ISSpositionsDB.find({}, (err, data) => {
        err ? resp.end : resp.json(data)
    })
})
