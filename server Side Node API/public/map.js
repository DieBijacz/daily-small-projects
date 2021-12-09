const api = 'https://api.wheretheiss.at/v1/satellites/25544'
const map = L.map('map').setView([0, 0], 6);

let firstTime = true
let displayMyCords = false

const myCoordsBtn = document.querySelector('#get-my-coords').addEventListener('click', (e) => {
    displayMyCords = true
    getMyCoords()
    e.target.style.display = 'none'
})

// MY CORDS


// MARKER
const issIcon = L.icon({
    iconUrl: 'International_Space_Station.png',
    iconSize: [30, 20],
    iconAnchor: [25, 16],
});
const marker = L.marker([0, 0], {icon: issIcon}).addTo(map);

// MAP
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer (tileUrl, {attribution})
tiles.addTo(map)

// CORDS
async function getData() {
    const resp = await fetch(api)
    const data = await resp.json()
    const {latitude, longitude} = data
    
    marker.setLatLng([latitude, longitude])
    map.setView([latitude, longitude], map.getZoom())
    // if (firstTime) {
    //     firstTime = false
    // }
    
    document.querySelector('#cords')
    .innerHTML = `
    ISS latitude: ${latitude.toFixed(2)}°${latitude > 0 ? 'N' : 'S'} </br> 
    IS longitude: ${longitude.toFixed(2)}°${longitude > 0 ? 'E' : 'W'}`
}
function displayMyCoords(pos) {
    document.querySelector('#my-cords')
    .innerHTML = `
    My latitude: ${pos.coords.latitude.toFixed(2)}°${pos.coords.latitude > 0 ? 'N' : 'S'} </br> 
    My longitude: ${pos.coords.longitude.toFixed(2)}°${pos.coords.longitude > 0 ? 'E' : 'W'}`
}

function getMyCoords() {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((pos) => {
            const myPosition = L.marker([pos.coords.latitude, pos.coords.longitude]).addTo(map);
            displayMyCoords(pos)
        })
    }
}


getData()
setInterval(getData, 1000)