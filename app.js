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

//Uncomment if needed to run locally
// const PORT = process.env.PORT || 8800;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
