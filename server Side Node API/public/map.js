const api = 'https://api.wheretheiss.at/v1/satellites/25544'
const map = L.map('map').setView([0, 0], 6);


//============================ MAP ============================
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer (tileUrl, {attribution})
tiles.addTo(map)

//=========================== CORDS ===========================
function sendMyCoords() {    
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(async (pos) => {
            const lat = pos.coords.latitude;
            const lon = pos.coords.longitude;
            const data = { lat, lon }
            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            };
            //user POST options with data
            const resp = await fetch('/api', options)
            //and gets response from server
            const json = await resp.json()
            console.log(json);
        })
    }
} 
async function sendISSCords(coordName) {
    const resp = await fetch(api)
    const data = await resp.json()
    const {latitude, longitude} = data

    const dane = { 
        latitude: latitude, 
        longitude: longitude, 
        name: coordName,
    }
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dane)
    }
    const respp = await fetch('/ISSdata', options)
    const odp = await respp.json()
    console.log(odp);
}
let followISS = false
async function getISSData() {
    const resp = await fetch(api)
    const data = await resp.json()
    const {latitude, longitude} = data
    
    
    marker.setLatLng([latitude, longitude])
    
    if (followISS) {
        map.setView([latitude, longitude], map.getZoom())
    } 
    
    
    document.querySelector('#cords')
    .innerHTML = `
    ISS latitude: ${(Math.abs(latitude)).toFixed(2)}°${latitude > 0 ? 'N' : 'S'}</br> 
    ISS longitude: ${(Math.abs(longitude)).toFixed(2)}°${longitude > 0 ? 'E' : 'W'}`

    return (latitude, longitude)
}

function displayMyCoords() {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((pos) => {
            const myPosition = L.marker([pos.coords.latitude, pos.coords.longitude]).addTo(map);
            document.querySelector('#my-cords')
            .innerHTML = `
            My pos: ${pos.coords.latitude.toFixed(2)}°${pos.coords.latitude > 0 ? 'N' : 'S'} </br> 
            My pos: ${pos.coords.longitude.toFixed(2)}°${pos.coords.longitude > 0 ? 'E' : 'W'}`
        })
    }
}

//============================ DB DATA ============================
async function getDataFromDB() {
    const list = document.querySelector('#list-of-coords')
    const resp = await fetch('/ISSdataDB')
    const data = await resp.json()
    console.log(data);

    data.forEach(item => {
        const dataString = new Date(item.timeStamp).toLocaleString()
        const element = document.createElement('li')
        element.classList.add('saved-coord')
        element.innerHTML = `
        <hr>
        date: ${dataString} </br>
        latitude: ${(Math.abs(item.latitude)).toFixed(2)}°${item.latitude > 0 ? 'E' : 'W'} </br>
        longitude: ${(Math.abs(item.longitude)).toFixed(2)}°${item.longitude > 0 ? 'N' : 'S'} </br>
        `
        list.appendChild(element)
        const mark = L.marker([item.latitude, item.longitude]).addTo(map);
        mark.bindTooltip(item.name === undefined ? '' : `${item.name}`).openTooltip();

    })
}

//=========================== CORDS ===========================
// ========================== BUTTONS ==========================
document.querySelector('#coord-form').addEventListener('submit', (e) => {
    e.preventDefault()
    const coordName = document.querySelector('#name-for-saved-coord')
    sendISSCords(coordName.value)
    coordName.value = ''
})
document.querySelector('#follow').addEventListener('click', () => {
    return followISS = !followISS
})
const sendCoordsBtn = document.querySelector('#get-coords')
sendCoordsBtn.addEventListener('click', () => {
    sendMyCoords()
    sendISSCords()
})
let displayMyCords = false
const myCoordsBtn = document.querySelector('#get-my-coords').addEventListener('click', (e) => {
    displayMyCords = true
    displayMyCoords()
    e.target.style.display = 'none'
})
document.querySelector('#get-saved-coords').addEventListener('click', () => {
    getDataFromDB()
})

// ========================== MARKER ==========================
const issIcon = L.icon({
    iconUrl: 'International_Space_Station.png',
    iconSize: [30, 20],
    iconAnchor: [25, 16],
});
const marker = L.marker([0, 0], {icon: issIcon}).addTo(map);

getISSData()
setInterval(getISSData, 1000)