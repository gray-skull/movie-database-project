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
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Movie added successfully!');
                    form.reset();
                } else {
                    alert(data.message || 'Error adding movie. Please try again.');
                }
            })
            .catch(error => console.error('Error:', error));
        });
    } else {
        console.error('Form not found on the page.');
});
