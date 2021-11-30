const APIpage = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI ="https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const main = document.querySelector('.main')
const form = document.querySelector('#form')
const search = document.querySelector('#search')

document.addEventListener('DOMContentLoaded', start())

function start(){
    // get movies on start from faw pages
    for(let i = 1; i < 22; i++){
        getMovies(APIpage+i);
    }
}

//get movies based on passed url
async function getMovies(url){
    const resp = await fetch(url)
    const respData = await resp.json()

    showMovies(respData.results)
}

function showMovies(movies){
    //add search
    movies.forEach((movie) => {
        const {backdrop_path, title, vote_average, overview} = movie
        const film = document.createElement('div')
        film.classList.add('movie')
        film.innerHTML = `
        <img src="${IMGPATH + backdrop_path}" alt="${title}">
        <div class="movie-info">
            <div class="title"><h4>${title}</h4></div>
            <span class="${getClassBasedOnRate(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
            <h4>${title}</h4>
            ${overview}
        </div>
        `
        main.appendChild(film)
    })
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const searchTerm = search.value

    if (searchTerm) {
        getMovies(SEARCHAPI + searchTerm)
        main.innerHTML = ""
        search.value = ""
    }
})

function getClassBasedOnRate(vote) {
    if(vote >= 8){
        return 'gold'
    } else if (vote >= 5){
        return 'orange'
    } else {
        return 'red'
    }
}