
// User u/search/ page:
if (document.title === 'Browser') {
    const searchIcon = document.querySelector('.search-icon');
    const searchInput = document.querySelector('.search-input');
    searchIcon.addEventListener('click', function () {
        searchIcon.classList.add('hidden');
        searchInput.classList.remove('hidden');
        searchInput.style.width = '80%';
        searchInput.style.opacity = '1';
    });
}

// u/search/:title page:
if (document.querySelector('.movie-details')) {
    document.querySelector('#saveFav').addEventListener('click', function () {
        
        const movie = {
            movie_id: document.querySelector('.movie-details').id,
            movie_title: document.title,
            movie_poster: document.querySelector('img').src,
        };
        fetch('/u/movies/22', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(movie)
        })
    });
}


// Manage editMovie put request

if (document.title === 'Edit movie') {
<<<<<<< HEAD
    const editMovieForm = document.querySelector('#editmovie-form');
=======
>>>>>>> develop
    const Title = document.querySelector("#editmovie-form > input[type=text]:nth-child(3)").value
    const Year = document.querySelector("#editmovie-form > input[type=text]:nth-child(7)").value
    const Runtime = document.querySelector("#editmovie-form > input[type=text]:nth-child(11)").value
    const Director = document.querySelector("#editmovie-form > input[type=text]:nth-child(15)").value
    const Writer = document.querySelector("#editmovie-form > input[type=text]:nth-child(19)").value
    const Actors = document.querySelector("#editmovie-form > input[type=text]:nth-child(23)").value
    const Plot = document.querySelector("#editmovie-form > input[type=text]:nth-child(27)").value
    const Poster = document.querySelector("#editmovie-form > input[type=text]:nth-child(31)").value

    form.addEventListener('submit', (event) => {
        event.preventDefault();

<<<<<<< HEAD
        fetch(`/admin/editmovie/${title}`, {
=======
        fetch(`https://localhost:3000/admin/editmovie/${title}`, {
>>>>>>> develop
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Title,
                Year,
                Runtime,
                Director,
                Writer,
                Actors,
                Plot,
                Poster
            })
        })
    });
<<<<<<< HEAD
=======
}

// Delete function for buttton remove in admin page
const deleteMovieButton = (deleteRoute) => {
    fetch(deleteRoute, {
        method: 'DELETE'
    })
        .then(location.reload())
>>>>>>> develop
}