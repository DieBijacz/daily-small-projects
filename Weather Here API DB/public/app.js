const api = 'https://api.wheretheiss.at/v1/satellites/25544'

let displayCoords = false

document.querySelector('#check-in').addEventListener('click', () => {
    sendMyData()
})
document.querySelector('#iss-coords').addEventListener('click', () => {
    getISSData()
})
document.querySelector('#display-coords').addEventListener('click', () => {
    displayCoordsF()
    return displayCoords = !displayCoords
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
            console.log(json);
        })
    }
}

async function getISSData() {
    const resp = await fetch(api)
    const ISS = await resp.json()
    const lat = ISS.latitude
    const lon = ISS.longitude
    const data = { lat, lon}
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }
    const respone = await fetch('/ISScoords', options)
    const json = await respone.json()
    console.log(json);
}
async function displayCoordsF() {
    if (!displayCoords) {
        const list = document.querySelector('#list')
        const resp = await fetch('/ISScoordsDB')
        const data = await resp.json()

        data.forEach(item => {
            const element = document.createElement('li')
            element.classList.add('coord-element')
            element.innerHTML = `
            latitude: ${(item.lat).toFixed(2)}<br>
            longitude: ${(item.lon).toFixed(2)}<br>
            `
            list.appendChild(element)
        })
    } else {
        document.querySelector('#list').innerHTML = ''
    }
}