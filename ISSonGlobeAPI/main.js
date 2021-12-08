const api = 'https://api.wheretheiss.at/v1/satellites/25544'
const map = L.map('map').setView([0, 0], 1);

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
    
    document.querySelector('#cords')
    .innerHTML = `latitude: ${latitude} </br> longitude: ${longitude}`
}

getData()
setInterval(getData, 1000)