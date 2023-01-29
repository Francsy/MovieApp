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
