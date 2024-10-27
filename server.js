const express = require('express');
const mysql = require('mysql2/promise');
const {MongoClient} = require('mongodb');
const MONGODB_URL = "mongodb+srv://admin:admin123@flix-database.duvrf.mongodb.net/flix_movie_db?retryWrites=true&w=majority&appName=flix-database";
const mongoclient = new MongoClient(MONGODB_URL);
require ('dotenv').config();

const app = express();
const PORT = 5500;

const Movie = require('./models/movieModel');
const methodOverride = require('method-override');
const { mongo } = require('mongoose');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(methodOverride('_method'));

// Connect to MongoDB
let db, collection, connection;
const mongoDbConnect = async () => {
    try {
        await mongoclient.connect();
        db = mongoclient.db('flix_movie_db');
        collection = db.collection('movies');
        console.log('Pinged MongoDB. Success!');
    } catch (error) {
        console.log('err', error);
    }
}

// Connect to MySQL
const mySqlDbConnect = async () => {
    try {
        connection = await mysql.createConnection({
            host: process.env.DATABASE_HOST,
            user: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME
        });
        console.log('Pinged MySQL. Success!');
    } catch (error) {
        console.log('err', error);
    }
}

// get bio from mongodb movies collection and send to client
app.get('/bio/:title', async (req, res) => {
    try {
        const bio = await collection.findOne({ title: req.params.title });
        res.status(200).json(bio);
        console.log('app.get /bio/:title');
    } catch (err) {
        console.log('err', err);
        res.status(500).json(err);
    }
});



// add a movie
app.post('/movies', async (req, res) => {
    try {
        const data = req.body;
        const mongoData = new Movie(data);

        // insert data into MongoDB and MySQL
        await collection.insertOne(mongoData);
        await connection.execute(
            `INSERT INTO movies (title, genre, releaseYear, rating, image) VALUES (?, ?, ?, ?, ?)`,
            [data.title, data.genre, data.releaseYear, data.rating, data.image]
        );


        res.status(200).redirect('/movie_details.html?title=' + data.title);
        console.log('app.post /movies');
    } catch (err) {
        console.log('err', err);
        res.status(500).json(err);
    }
});

// edit a movie
app.put('/movies/:editTitle', async (req, res) => {
    console.log('app.put /movies');
    try {
        if(!connection) {
            console.log('No connection to MySQL. Connecting now...');
            connection = await mySqlDbConnect();
        }
        const data = req.body;
        const editTitle = data.editTitle;

        const oldData = await connection.query(
            `SELECT * FROM movies WHERE title = ?`,
            [editTitle]
        );

        // only update fields with a value from form
        if(data.newTitle === '') {
            data.newTitle = oldData[0][0].title;
        }
        if(data.newGenre === '') {
            data.newGenre = oldData[0][0].genre;
        }
        if(data.newReleaseYear === '') {
            data.newReleaseYear = oldData[0][0].releaseYear;
        }
        if(data.newRating === '') {
            data.newRating = oldData[0][0].rating;
        }
        if(data.newImage === '') {
            data.newImage = oldData[0][0].image;
        }

        // update data in MongoDB and MySQL
        await connection.query(
            `UPDATE movies SET title = ?, genre = ?, releaseYear = ?, rating = ?, image = ? WHERE title = ?`,
            [data.newTitle, data.newGenre, data.newReleaseYear, data.newRating, data.newImage, editTitle]
        ).then(console.log('Updated MySQL'));

        await collection.updateOne(
            { title: editTitle },
            { $set: { title: data.newTitle, genre: data.newGenre, releaseYear: data.newReleaseYear, rating: data.newRating, image: data.newImage, summary: data.newSummary } }
        ).then(console.log('Updated MongoDB'));

        res.status(200).redirect('/movie_details.html?title=' + data.newTitle);
        console.log('app.put /movies/', editTitle);
    } catch (err) {
        console.log('err', err);
        res.status(500).send('Ann error occurred:', err.message);
    }
});

// delete a movie
app.delete('/movies/:title', async(req, res) => {
    try {
        await connection.query(
            `DELETE FROM movies WHERE title = ?`,
            [req.params.title]
        );
        await collection.deleteOne({ title: req.params.title });

        res.status(200).json({ message: 'Movie deleted' });
        console.log(`app.delete /movies/${req.params.title}`);
    } catch (err) {
        console.log('err', err);
        res.status(500).json(err);
    }
});

// send index.html file to the client on the root route '/'
app.get('/', (req, res) => {
    res.sendFile('index.html');
  });

// get all movies
app.get('/movies', async(req, res) => {
    try {
        const [movies] = await connection.query(
            'SELECT * FROM movies'
        );

        res.status(200).json(movies);
        console.log('app.get /movies');
    } catch (err) {
        console.log('err', err);
        res.status(500).json(err);
    }
});

// fetch the details of a single movie
app.get('/movie_details.html/:title', async(req, res) => {
    try {
        const [movies] = await connection.query(
            `SELECT * FROM movies WHERE title = ?`, 
            [req.params.title]
        );
        const mongoData = await collection.findOne({ title: req.params.title });
        if (mongoData) {
            movies[0].summary = mongoData.summary;
        }

        res.status(200).json(movies);
        console.log(`app.get /movie_details.html:${req.params.title}`, movies);
    } catch (err) {
        console.log('err', err);
        res.status(500).json(err);
    }
});

// fetch a single movie
app.get('/movies/:title', async(req, res) => {
    try {
        const [movies] = await connection.query(
            `SELECT * FROM movies WHERE title = ?`, 
            [req.params.title]
        );

        res.status(200).json(movies);
        console.log('app.get /movies:title');
    } catch (err) {
        console.log('err', err);
        res.status(500).json(err);
    }
});


app.listen(PORT, async () => {
    try {
        await mongoDbConnect();
        await mySqlDbConnect();
        console.log(`Listening on http://127.0.0.1:${PORT}`);
    } catch (error) {
        console.log(error.message);
    }
});
