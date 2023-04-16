const searchForm = document.querySelector('.search');
searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const searchQuery = searchForm.elements['search'].value;
    location.href = `/recipes?search=${searchQuery}`;
});

// https://www.w3schools.com/jsref/event_preventdefault.asp
// https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault 