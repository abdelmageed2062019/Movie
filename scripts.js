const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=13f955e7bb1d34053ad646c599f9290c&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_URL = 'https://api.themoviedb.org/3/search/movie?api_key=13f955e7bb1d34053ad646c599f9290c&query="'

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

//get intial movies
getMovies(API_URL)

async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()

    showMovies(data.results);

}

function showMovies(movies) {
    main.innerHTML =  ' '

    movies.forEach((movie) => {
            const { title, poster_path , vote_average, overview} = movie

            const movieEl = document.createElement('div')
            movieEl.classList.add('movie')

            movieEl.innerHTML = `
            
            <img src="${IMG_PATH + poster_path}" alt=""/>
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>overview</h3>
               ${overview}
            </div>
        
            `

            main.appendChild(movieEl)
    })
}

function getClassRate(vote) {
    if (vote >= 8) {
        return 'green'
    }else if (vote >= 5) {
        return 'orange'
    }else {
        return 'red'
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchTerms = search.value

    if(searchTerms && searchTerms !== '') {
        getMovies(SEARCH_URL + searchTerms)

        search.value = ''
    }else {
        window.location.reload()
    }
})