const express = require('express');
const Datastore = require('nedb')
// const { response } = require('express');
const app = express();
app.listen(3000, () => {console.log('list 3000')})
app.use(express.static('public'))
app.use(express.json({limit: '1mb'}))

const ISSpositionsDB = new Datastore('ISSPositions.db')
ISSpositionsDB.loadDatabase()
const timeStamp = Date.now()

app.post('/api', (request, response) => {
    //server req data
    const data = request.body
    data.timeStamp = timeStamp
    //and as response sends this
    response.json({
        status: 'success',
        timestamp: timeStamp,
        latitude: data.lat,
        longitude: data.lon,
    })
})

app.post('/ISSdata', (req, res) => {
    const data = req.body
    data.timeStamp = timeStamp
    ISSpositionsDB.insert(data)
    res.json({
        status: 'gitara',
        timestamp: timeStamp,
        latitude: data.latitude,
        longitude: data.longitude,
        name: data.name
    })
})

// app.post('/SavedISSCords', (req, res) => {

//     res.json({
//         status: 'gitara',
//         timestamp: timeStamp,
//         latitude: data.latitude,
//         longitude: data.longitude,
//     })
// }