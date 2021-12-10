const api = 'https://api.wheretheiss.at/v1/satellites/25544'

let visible = false

document.querySelector('#check-in').addEventListener('click', () => {
    sendMyData()
})
document.querySelector('#iss-coords').addEventListener('click', () => {
    getISSData()
})
document.querySelector('#display-coords').addEventListener('click', () => {
    visible = !visible
    displayCoordsF()
})
document.querySelector('#clear-all').addEventListener('click', () => {
    clearAllDataDB()
})

function sendMyData() {
    if('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(async (pos) => {
            const lat = pos.coords.latitude
            const lon = pos.coords.longitude
            const data = {lat , lon}
            const options = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            }
            const resp = await fetch('/myCoords', options)
            const json = await resp.json()

            await getWeatherInfo(lat, lon)
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

    displayCoordsF()
}

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
            latitude: ${(item.lat).toFixed(2)}<br>
            longitude: ${(item.lon).toFixed(2)}<br>
            temp: ${((item.temp)-274.15).toFixed(1)}°C<br>
            `
            list.appendChild(element)
        })
    }
}

async function getWeatherInfo(lat, lon) {
    const myWeatherAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=fea7f0cf2c0c99a17db8d3f8b36ec15d`
    const respone = await fetch(myWeatherAPI)
    const weather = await respone.json()
    console.log(`${((weather.main.temp)-274.15).toFixed(1)}°C`);
    return weather.main.temp
}

async function clearAllDataDB() {
    const resp = await fetch('/ISScoordsDBclear')
    const data = await resp.json()
    console.log(data);
}


