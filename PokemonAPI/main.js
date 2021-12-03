const Apidata = {
    url: "https://pokeapi.co/api/v2/",
    type: "pokemon",
    id: '1',
}
const {url, type, id} = Apidata

document.addEventListener('DOMContentLoaded', load())

async function load() {
    for(let i = 1; i < 300; i++){
        const apiURL = `${url}${type}/${i}`
        await fetch(apiURL)
        .then(resp => resp.json())
        .then(data => {
            getPokemon(data)
        })
    }
}

function getPokemon(poke){
    console.log(poke);
    const pokemon = document.createElement('div')
    pokemon.classList.add('pokemon')
    pokemon.innerHTML = 
    `
    <div class="name">${poke.name}</div>
    <img src=${poke.sprites.front_default}>
    <div class="id-number">ID: ${poke.id}</div>
    `
    console.log(pokemon);
    const list = document.querySelector(".pokemons")
    list.appendChild(pokemon)
}