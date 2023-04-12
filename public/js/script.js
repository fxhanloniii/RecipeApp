const searchForm = document.querySelector('.search');
searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const searchQuery = searchForm.elements['search'].value;
    location.href = `/recipes?search=${searchQuery}`;
});