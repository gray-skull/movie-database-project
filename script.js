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
document.addEventListener('DOMContentLoaded', function(){
    const form = document.getElementById('add-movie-form');

    if (form) {
        form.addEventListener('submit' , function(event) {
            const title = document.getElementById('title').value;
            const releaseYear = document.getElementById('release-year').value;
            const rating = document.getElementById('rating).value;

            if (title.length < 2) {
                alert('Movie title must be at least 2 characters long');
                event.preventDefault();
            }

            if (releaseYear < 1900 || releaseYear > new Date().getFullYear()) {
                alert(`Release year must be between 1900 and ${new Date().getFullYear()}`);
                event.preventDefault();
            }

            if (rating < 0 || rating > 10) {
                alert('Rating must be between 0 and 10');
                event.preventDefault;
            }
        });
    }
});
