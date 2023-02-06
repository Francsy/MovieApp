
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
            movie_poster: document.querySelector('#renderPoster').src,
        };
        fetch('/u/movies', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(movie)
        })
    });
}

//DELETE FAV
// if (document.title === 'My Movies') {
//     document.querySelectorAll('.delete-fav').forEach(button => {
//         button.addEventListener('click', function (event) {
//             event.preventDefault();
//             const movieId = this.id;
//             fetch(`/u/movies`, {
//                 method: 'DELETE',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ movie_id: movieId })
//             });
//             this.parentElement.remove();
//         });
//     });
// }

if (document.title === 'My Movies') {
    document.querySelectorAll('.delete-fav').forEach(button => {
        button.addEventListener('click', function (event) {
            event.preventDefault();
            const movieId = this.id;
            const popup = document.createElement("div");
            popup.innerHTML = `
                <div class="popup-background">
                    <div class="popup-content">
                        <p>Are you sure you want to delete this movie from your favorites?</p>
                        <button id="confirm-delete">Delete</button>
                        <button id="cancel-delete">Cancel</button>
                    </div>
                </div>
            `;
            document.body.appendChild(popup);
            document.getElementById("confirm-delete").addEventListener("click", function() {
                fetch(`/u/movies`, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ movie_id: movieId })
                });
                this.parentElement.remove();
                popup.remove();
            });
            document.getElementById("cancel-delete").addEventListener("click", function() {
                popup.remove();
            });
        });
    });
}

// Manage editMovie put request

if (document.title === 'Edit movie') {
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

        fetch(`https://localhost:3000/admin/editmovie/${title}`, {
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
}

// Delete function for buttton remove in admin page
const deleteMovieButton = (deleteRoute) => {
    fetch(deleteRoute, {
        method: 'DELETE'
    })
        .then(location.reload())
}