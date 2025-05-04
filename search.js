const API_KEY = '';

const movieSearch = document.getElementById('movieSearch');

const title = localStorage.getItem('searchTitle');

if(title) {
    searchMovie(title);
} 

async function searchMovie(t) {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(t)}`, {
        
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
        }
    })

    const data = await response.json();

    data.results.forEach(movie => {
        const title = movie.title;
        const p = document.createElement('p');
        const img = document.createElement('img');
        const div = document.createElement('div');

        p.textContent = title;
        p.style.color = 'white';

        img.src = `https://image.tmdb.org/t/p/w342${movie.poster_path}`;

        img.onerror = () => { 
            img.src = `notfound.jpeg`;
            img.style.width = '342px';
        }

        img.addEventListener('click',() => {
            window.location.href = "description.html";
            localStorage.setItem('selectedMovie',JSON.stringify(movie));
        })

        div.className = "movie";
        div.appendChild(p);
        div.appendChild(img);
        movieSearch.appendChild(div);

        console.log(movieSearch); 
    });
};

