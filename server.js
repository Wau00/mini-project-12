// dependencies
const express = require("express");
const mysql = require("mysql2");
const path = require("path");

// add __dirname to make sure that we are grabbing from the right directory
const uuid = require(__dirname + '/helpers/uuid');

// set up express and data parsing
const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ~~~~~~~~~ mysql connection ~~~~~~~~~
// const db = mysql.createConnection(
//     {
//         host: 'localhost',
//         user: 'root',
//         password: 'password',
//         database: 'movies_db'
//     },
//     console.log(`Connected to the movies_db database.`)
// );

// ~~~~~~~~~ routes ~~~~~~~~~
// shows all movies page
app.get("/api/movies", (req, res) => {

    // db query for all movies under movie_db
});

// shows reviews for movie param
app.get("/api/:movie/reviews", (req, res) => {
    console.log(req.params.movie)

    // db query for all reviews under a specific movie
});

// adds a movie to the database using movie param
app.post("/api/new-movie/", (req, res) => {
    console.log(req.body);

    // db query to add a movie using the movie param as the name
});

// updates a movie review for the selected movie using the movies param
app.put("/api/update-review/", (req, res) => {
    console.log(req.body)

    // db query to update a param review with the review id of param id to the param movie.
});

// deletes a review with the review id of the id param from the movie param
app.delete("/api/delete-review/:id", (req, res) => {
    console.log(req.params.id)

    // db query to delete a review using the params id and movie 
});

app.listen(PORT, () => {
    console.log("Listening on PORT ", PORT);
});