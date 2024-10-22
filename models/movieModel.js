// model for movie collection
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required']
        },
        genre: {
            type: String,
            required: [true, 'Genre is required']
        },
        releaseYear: {
            type: Number,
            required: [true, 'Release year is required']
        },
        rating: {
            type: Number,
            required: [true, 'Rating is required']
        }
    },
    {
        timestamps: true
    }
);

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;