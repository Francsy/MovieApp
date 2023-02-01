// User search/ browser.pug:
if (document.title === 'Browser') {
    const searchIcon = document.querySelector('.search-icon');
    const searchInput = document.querySelector('.search-input');
    searchIcon.addEventListener('click', function(){
        searchIcon.classList.add('hidden');
        searchInput.classList.remove('hidden');
        searchInput.style.width = '80%';
        searchInput.style.opacity = '1';
    });
}


// User /search/:title movie.pug page:
if (document.querySelector('.movie-details')) {
    document.getElementById('saveFav').addEventListener('click', () => {
        fetch('/movies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Title: `${document.title}`,
            })
        });
    });
}
