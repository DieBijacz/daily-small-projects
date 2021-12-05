const Apidata = {
  url: "https://pokeapi.co/api/v2/",
  type: "pokemon",
  id: "1",
};
const { url, type, id } = Apidata;
const list = document.querySelector(".pokemons");
let pokemons = [];

document.addEventListener("DOMContentLoaded", load());
SearchForPokemon();

// ================================LOAD API================================
async function load() {
  try {
    for (let i = 1; i < 300; i++) {
      const apiURL = `${url}${type}/${i}`;
      const resp = await fetch(apiURL);
      const data = await resp.json();
      pokemons.push(data);
    }
  } catch (er) {
    console.error(err);
  }

  addPokemonToList(pokemons);
}
// ================================LOAD API================================
// ===========================SEARCH FOR POKEMON===========================
function SearchForPokemon() {
  const searchForm = document.querySelector("#search");
  searchForm.addEventListener("keyup", (e) => {
    const search = e.target.value;
    const FoundPokemons = pokemons.filter((pokemon) => {
      return pokemon.name.includes(search);
    });
    list.innerHTML = "";
    addPokemonToList(FoundPokemons);
  });
}
// ===========================SEARCH FOR POKEMON===========================
// ============================DISPLAY POKEMONS============================

function addPokemonToList(pokemons) {
  pokemons.forEach((poke) => {
    const pokemon = document.createElement("div");
    pokemon.classList.add("pokemon");
    pokemon.innerHTML = `
        <div class="name">${poke.name}</div>
        <img src=${poke.sprites.front_default}>
        <div class="id-number">ID: ${poke.id}</div>
        `;
    list.appendChild(pokemon);
  });
}
// ============================DISPLAY POKEMONS============================
