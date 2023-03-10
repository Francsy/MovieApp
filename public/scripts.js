
// User u/search/ page:
if (document.title === 'Browser') {
    const searchIcon = document.querySelector('.search-icon');
    const searchInput = document.querySelector('.search-input');
    const moviesLinksToDetails = document.querySelectorAll('body > main > section > article a')
    searchIcon.addEventListener('click', function () {
        searchIcon.classList.add('hidden');
        searchInput.classList.remove('hidden');
        searchInput.style.width = '80%';
        searchInput.style.opacity = '1';
    });

    moviesLinksToDetails.forEach(function (link) {
        link.addEventListener('click', function () {
            document.querySelector("main").style.display = "none";
            const loadingImg = document.createElement("img");
            loadingImg.setAttribute("id", "loadingGif");
            loadingImg.setAttribute("src", "/assets/loading-gif.gif")
            document.querySelector("body").appendChild(loadingImg);
        });
    });
}



if (document.querySelector('.movie-details')) {
    if (document.querySelector('#saveFav')) {
        document.querySelector('#saveFav').addEventListener('click', function () {
            const saveButton = document.querySelector('#saveFav');
            saveButton.innerHTML = 'Saving...';
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
                .then(() => {
                    saveButton.innerHTML = 'Saving...';
                    location.reload();
                });
        });
    } else {
        document.querySelector('#deleteFav').addEventListener('click', function () {
            const deleteButton = document.querySelector('#deleteFav');
            deleteButton.innerHTML = 'Removing...';
            const movie = {
                movie_id: document.querySelector('.movie-details').id,
            };
            fetch(`/u/movies`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(movie)
            })
            .then(location.reload())

            // .then(() => {
            //     document.querySelector('#deleteFav').innerText = 'Save Favourite';
            //     document.querySelector('#deleteFav').id = 'saveFav'
            // });
        })
    }
}

//DELETE FAV
if (document.title === 'My Movies') {
    const moviesLinksToDetails = document.querySelectorAll('body > main > section > article a');
    moviesLinksToDetails.forEach(function (link) {
        link.addEventListener('click', function () {
            document.querySelector("main").style.display = "none";
            const loadingImg = document.createElement("img");
            loadingImg.setAttribute("id", "loadingGif");
            loadingImg.setAttribute("src", "/assets/loading-gif.gif")
            document.querySelector("body").appendChild(loadingImg);
        });
    });
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
            document.getElementById("confirm-delete").addEventListener("click", function () {
                fetch(`/u/movies`, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ movie_id: movieId })
                });
                document.querySelector(`#${movieId}`).parentElement.remove();
                popup.remove();
            });
            document.getElementById("cancel-delete").addEventListener("click", function () {
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

if (document.title === 'Recover Password') {
    document.querySelector('.recoverForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        const email = document.querySelector('.emailForm').value;
        try {
            const response = await fetch('/recoverpassword/:email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });
            const data = await response.json();
            if (data.message) {
                alert(data.message);
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error(error);
        }
    });
};