// format movie lists from MySQL DB
document.addEventListener('DOMContentLoaded', async () => {
    if (window.location.pathname === '/movie_list.html' || window.location.pathname === '/index.html') {
        const response = await fetch('/movies');
        const data = await response.json();
        console.log('data', data);

        const featured_movie_list = document.querySelector('div#featured-movie-list');
        const full_movie_list = document.querySelector('div#full-movie-list');

        let maxMovies;
        let movie_list;

        if(featured_movie_list) {
            maxMovies = 3;
            movieListTarget = featured_movie_list;
        }
        else {
            maxMovies = data.length;
            movieListTarget = full_movie_list;
        }

        for (let i = 0; i < maxMovies; i++) {
            const link = document.createElement('a');
            const div = document.createElement('div');
            div.classList.add('movie');
            const h3Title = document.createElement('h3');
            const pGenre = document.createElement('p');
            const pRelease = document.createElement('p');
            const pRating = document.createElement('p');
            const imgImage = document.createElement('img');

            imgImage.src = `${data[i].image}`;
            imgImage.alt = `${data[i].title} poster`;
            h3Title.textContent = `${data[i].title}`;
            pGenre.textContent = `Genre: ${data[i].genre}`;
            pRelease.textContent = `Release: ${data[i].releaseYear}`;
            pRating.textContent = `Rating: ${data[i].rating}`;

            div.append(imgImage, h3Title, pGenre, pRelease, pRating);
            link.href = `/movie_details.html?title=${data[i].title}`;
            link.append(div);
            movieListTarget.append(link);
        }
    }   
});


// fetch the details of a single movie and display them on the movie_details.html page
document.addEventListener('DOMContentLoaded', async () => {
    if(window.location.pathname === '/movie_details.html') {
        const response = await fetch(`/movie_details.html/${window.location.search.split('=')[1]}`);
        const data = await response.json();
        console.log('data', data);

        const movieDetails = document.getElementById('movie-details');
        const h2Title = document.createElement('h2');
        const pGenre = document.createElement('p');
        const pRelease = document.createElement('p');
        const pRating = document.createElement('p');
        const imgImage = document.createElement('img');
        const pSummary = document.createElement('p');

        imgImage.src = `${data[0].image}`;
        imgImage.alt = `${data[0].title} poster`;
        h2Title.textContent = `${data[0].title}`;
        pGenre.innerHTML = `<strong>Genre:</strong> ${data[0].genre}`;
        pRelease.innerHTML = `<strong>Release:</strong> ${data[0].releaseYear}`;
        pRating.innerHTML = `<strong>Rating:</strong> ${data[0].rating}`;
        pSummary.innerHTML = `<strong>Summary:</strong> ${data[0].summary}`;

        movieDetails.append(imgImage, h2Title, pGenre, pRelease, pRating, pSummary);

        const buttonSection = document.createElement('div');
        buttonSection.className = 'button-section';
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => {
            window.location.href = `/edit_movie.html?title=${data[0].title}`;
        });

        buttonSection.append(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', async () => {
            const response = await fetch(`/movies/${data[0].title}`, {
                method: 'DELETE'
            });

            if(response.status === 200) {
                const successMessage = document.createElement('p');
                successMessage.textContent = `"${window.location.search.split('=')[1]}" deleted successfully`;
                alert(successMessage.textContent);
                window.location.href = '/movie_list.html';
            }
        });
        buttonSection.append(deleteButton);
        movieDetails.append(buttonSection);
    }
});

// fetch the details of a single movie and display them on the edit_movie.html page
document.addEventListener('DOMContentLoaded', async () => {
    if(window.location.pathname === '/edit_movie.html') {
        const response = await fetch(`/movie_details.html/${window.location.search.split('=')[1]}`);
        const data = await response.json();
        console.log('data', data);

        const editTitle = document.getElementById('editTitle');
        const inputTitle = document.getElementById('newTitle');
        const inputGenre = document.getElementById('newGenre');
        const inputRelease = document.getElementById('newReleaseYear');
        const inputRating = document.getElementById('newRating');
        const inputImage = document.getElementById('newImage');
        const inputSummary = document.getElementById('newSummary');

        editTitle.value = data[0].title;
        inputTitle.value = data[0].title;
        inputGenre.value = data[0].genre;
        inputRelease.value = data[0].releaseYear;
        inputRating.value = data[0].rating;
        inputImage.value = data[0].image;
        inputSummary.value = data[0].summary;

    }
});

document.addEventListener('DOMContentLoaded', async () => {
    await fetch('partials/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header').innerHTML = data;
        });
});

document.addEventListener('DOMContentLoaded', async () => {
    await fetch('partials/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer').innerHTML = data;
        });
});

document.addEventListener('DOMContentLoaded', async () => {
    await fetch('partials/sidebar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('sidebar').innerHTML = data;
        });
});

function navigateToPage() {
    const mobileNav = document.getElementById('mobile-nav');
    const selectedPage = mobileNav.value;
    if(selectedPage) {
        window.location.href = selectedPage;
    }
};




