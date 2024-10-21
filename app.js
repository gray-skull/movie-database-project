const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const movies = [];

app.post('/add-movie', (req, res) => {
    const { title, genre, releaseYear, rating } = req.body;

    if (!title || !genre || !releaseYear || !rating) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const newMovie = { title, genre, releaseYear, rating };
    movies.push(newMovie);

    res.json({ success: true, message: 'Movie added successfully', movie: newMovie });
});

app.put('/movies/:id', (req, res) => {
    const { id } = req.params;
    const { title, genre, releaseYear, rating } = req.body;

    if (!title || !genre || !releaseYear || !rating) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const movieIndex = movies.findIndex(movie => movie.id === id);

    if (movieIndex !== -1) {
        movies[movieIndex] = { id, title, genre, releaseYear, rating };
        return res.json({ success: true, message: 'Movie updated successfully', movie: movies[movieIndex] });
    } else {
        return res.status(404).json({ success: false, message: 'Movie not found' });
    }
});

//Uncomment if needed to run locally
// const PORT = process.env.PORT || 8800;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
