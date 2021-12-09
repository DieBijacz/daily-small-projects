const { response } = require('express');
const express = require('express');
const app = express();
app.listen(3000, () => {console.log('list 3000')})
app.use(express.static('public'))
app.use(express.json({limit: '1mb'}))

const positions = []
const ISSpositions = []

app.post('/api', (request, response) => {
    //server req data
    const data = request.body
    positions.push(data)
    //and as response sends this
    response.json({
        status: 'success',
        latitude: data.lat,
        longitude: data.lon,
    })
    console.log(positions);
})

app.post('/ISSdata', (req, res) => {
    const data = req.body
    ISSpositions.push(data)
    res.json({
        status: 'gitara',
        latitude: data.lat,
        longitude: data.lon,
    })
    console.log(ISSpositions);
})