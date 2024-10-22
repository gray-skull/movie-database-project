const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const Movie = require('./models/movieModel');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Connect to MongoDB
mongoose.set("strictQuery", false);
mongoose.
connect("mongodb+srv://admin:admin123@flix-database.duvrf.mongodb.net/flix_movie_db?retryWrites=true&w=majority&appName=flix-database")
.then (() => {
    const PORT = process.env.PORT || 8000;
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    });
})
.catch ((error) => {
    console.error(error)
});

// get all movies
app.get('/movies', async(req, res) => {
    try {
        const movies = await Movie.find({});
        res.status(200).json(movies);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
});

// get a single movie
app.get('/movies/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const movie = await Movie.findById(id);
        if (movie) {
            res.status(200).json(movie);
        } else {
            res.status(404).json({message: 'Movie not found'});
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
});

// add a movie
app.post('/movies', async(req, res) => {
    try {
        const {title, genre, releaseYear, rating} = req.body;
        if (!title || !genre || !releaseYear || !rating) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }
        const movie = await Movie.create(req.body);
        res.status(200).json(movie);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
});

// edit a movie
app.put('/movies/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const movie = await Movie.findByIdAndUpdate(id, req.body);
        // if movie is not found
        if (!movie) {
            return res.status(404).json({message: `Movie with id ${id} not found`});
        }
        const updatedMovie = await Movie.findById(id);
        res.status(200).json({message: 'Movie updated successfully', updatedMovie});

    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});       
    }
});

// delete a movie
app.delete('/movies/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const movie = await Movie.findByIdAndDelete(id);
        if (!movie) {
           return res.status(404).json({message: `Movie with id ${id} not found`});
        }
        res.status(200).json({message: 'Movie deleted successfully'});

    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
});


