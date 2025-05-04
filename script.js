const popularDay = document.getElementById('popular-day');
const popularWeek = document.getElementById('popular-week');
const ratedMovie = document.getElementById('rated-movie');

const background = document.getElementById('background');
const button = document.getElementById('button');

//Pegar o nome do filme
function getTitle(){
    const tit = document.getElementById('search').value;
    return tit;
}

// Acionar a pesquisa
button.addEventListener('click', () => {
    const title = getTitle();
    localStorage.setItem('searchTitle', title); 
    window.location.href = "search.html"; 
});
 

//Chave da API
const apiKey = //KEY;


async function Background(name,item) {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${name}`,{
        
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
    }
})
    const data = await response.json();

    const movie = data.results[0]
    item.style.backgroundImage = `url('https://image.tmdb.org/t/p/w1280${movie.backdrop_path}')`

}

async function Trending(opt,item) {
    const response = await fetch(`https://api.themoviedb.org/3/trending/movie/${opt}`, {
        
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
    }
})
    const data = await response.json();

    data.results.forEach(movie => {

        const poster = document.createElement('img');
        const div = document.createElement('div');
        div.setAttribute("class", "movie");
        poster.setAttribute("class", "poster");

        poster.addEventListener('click',() => {
            window.location.href = "description.html";
            localStorage.setItem('selectedMovie',JSON.stringify(movie));
        })

        poster.src= `https://image.tmdb.org/t/p/w185${movie.poster_path}`;
        div.appendChild(poster);
        item.appendChild(div);
    });
}

async function Popular(opt,item) {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${opt}`, {
        
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
    }
})
    const data = await response.json();

    data.results.forEach(movie => {

        const poster = document.createElement('img');
        const div = document.createElement('div');
        poster.setAttribute("class", "poster");

        poster.addEventListener('click',() => {
            window.location.href = "description.html";
            localStorage.setItem('selectedMovie',JSON.stringify(movie));
        })

        poster.src = `https://image.tmdb.org/t/p/w185${movie.poster_path}`;
        div.appendChild(poster);
        item.appendChild(div);
    
    });
}
 
const day = 'day';
const week = 'week';
const top_rated = 'top_rated';

Trending(day,popularDay);
Trending(week,popularWeek);
Popular(top_rated,ratedMovie);

Background('my neighbor Totoro',background);