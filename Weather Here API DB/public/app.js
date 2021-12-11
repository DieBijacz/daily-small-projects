const api = 'https://api.wheretheiss.at/v1/satellites/25544'

let visible = false

document.querySelector('#check-in').addEventListener('click', () => {
    sendMyData()
})
document.querySelector('#iss-coords').addEventListener('click', () => {
    getISSData()
})
document.querySelector('#display-coords').addEventListener('click', (e) => {
    visible = !visible    
    e.target.style.background = visible ? '#5FC350' : '#EFEFEF'
    displayCoordsF()
})
document.querySelector('#clear-all').addEventListener('click', () => {
    clearAllDataDB()
    displayCoordsF()
})

//=================================== MAP ===================================
let map = L.map('map').setView([51.505, -0.09], 1);

const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer (tileUrl, {attribution})
tiles.addTo(map)

//=================================== MAP ===================================
//================================= COORDS ==================================
function sendMyData() {
    if('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(async (pos) => {
            // DATA
            const lat = pos.coords.latitude
            const lon = pos.coords.longitude
            const temp = await getWeatherInfo(lat, lon)
            const data = {lat , lon, temp}
            
            // DISPLAY MY COORDS  ON SCREEN
            document.querySelector('#my-coords').innerHTML = `
            latitude: ${(Math.abs(lat)).toFixed(2)} ${lat > 0 ? 'N' : 'S'}<br>
            longitude: ${(Math.abs(lon)).toFixed(2)} ${lon > 0 ? 'W' : 'E'}<br>
            temp: ${((temp)-274.15).toFixed(1)}°C<br>`
            displayOnMap(lat, lon)

            // SERVER ROUTE
            const options = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            }

            const resp = await fetch('/myCoords', options)
            const json = await resp.json()
            console.log(json);
        })
    }
}

async function getISSData() {
    const resp = await fetch(api)
    const ISS = await resp.json()
    const lat = ISS.latitude
    const lon = ISS.longitude

    const temp = await getWeatherInfo(lat, lon)
    
    const data = {lat, lon, temp}
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }
    const respone = await fetch('/ISScoords', options)
    const json = await respone.json()

    displayOnMap(lat, lon)
    displayCoordsF()
}
//================================= COORDS ==================================

async function displayCoordsF() {
    document.querySelector('#list').innerHTML = ''
    if (visible) {
        const list = document.querySelector('#list')
        const resp = await fetch('/ISScoordsDB')
        const data = await resp.json()

        data.forEach(item => {
            const element = document.createElement('li')
            element.classList.add('coord-element')
            element.innerHTML = `
            latitude: ${(Math.abs(item.lat)).toFixed(2)} ${item.lat > 0 ? 'N' : 'S'}<br>
            longitude: ${(Math.abs(item.lon)).toFixed(2)} ${item.lon > 0 ? 'W' : 'E'}<br>
            temp: ${((item.temp)-274.15).toFixed(1)}°C<br>
            `
            list.appendChild(element)
        })
    }
}

async function getWeatherInfo(lat, lon) {
    const myWeatherAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=fea7f0cf2c0c99a17db8d3f8b36ec15d`
    const resp = await fetch(myWeatherAPI)
    const weather = await resp.json()
    console.log(weather);
    return weather.main.temp
}

async function clearAllDataDB() {
    const resp = await fetch('/ISScoordsDBclear')
    const data = await resp.json()
    console.log(data);
}

function displayOnMap (lat, lon) {
    let marker = L.marker([lat, lon]).addTo(map);
}

