loadHeader();
loadFooter();
loadSidebar();

function loadHeader() {
    document.addEventListener('DOMContentLoaded', function() {
        fetch('partials/header.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('header').innerHTML = data;
            });
    });
}

function loadFooter() {
    document.addEventListener('DOMContentLoaded', function() {
        fetch('partials/footer.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('footer').innerHTML = data;
            });
    });
}

function loadSidebar() {
    document.addEventListener('DOMContentLoaded', function() {
        fetch('partials/sidebar.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('sidebar').innerHTML = data;
            });
    });
}

function navigateToPage() {
    const mobileNav = document.getElementById('mobile-nav');
    const selectedPage = mobileNav.value;
    if(selectedPage) {
        window.location.href = selectedPage;
    }
}

//Form validation for the add_movie
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('add-movie-form');

    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            const formData = new FormData(form);
            const movieData = {
                title: formData.get('title'),
                genre: formData.get('genre'),
                releaseYear: formData.get('release-year'),
                rating: formData.get('rating')
            };

            fetch('/add-movie', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(movieData)
            })
            .then(response => {
                if (!response.ok) {
                    console.error(`Server Error: ${response.status}`);
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    alert('Movie added successfully!');
                    form.reset();
                } else {
                    alert(data.message || 'Error adding movie. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        });
    } else {
        console.error('Form not found on the page.');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('edit-movie-form');

    const urlParams = new URLSearchParams(window.location.search);
    const movieID = urlParams.get('id');

    function fetchMovieDetails(id) {
        fetch(``)
        .then(response => respponse.json())
        .then(data => {
            document.getElementById('title').value = data.title;
            document.getElementById('genre').value = data.genre;
            document.getElementById('release-year').value = data.releaseYear;
            document.getElementById('rating').value = data.rating;
        })
        .catch(error => console.error('Error fetching movie details:', error));
    }
    if (movieID) {
        fetchMovieDetails(movieId);
    }
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            const formData = new FormData(form);
            const updatedMovie = {
                title: formData.get('title'),
                genre: formData.get('genre'),
                releaseYear: formData.get('release-year'),
                rating: formData.get('rating')
            };

            fetch(``, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedMovie)
            })
            .then(response => {
                if (!response.ok) {
                    console.error(`Server Error: ${response.status}`);
                    throw new Error (`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.success){
                    alert('Movie updated successfully');
                } else {
                    alert(data.message || 'Error updating movie. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        });
    } else {
        console.error('Form not found on the page.');
    }
});

