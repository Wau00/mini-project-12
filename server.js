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
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'movies_db'
    },
    console.log(`Connected to the movies_db database.`)
);

// ~~~~~~~~~ routes ~~~~~~~~~
// shows all movies page
app.get("/api/movies", (req, res) => {

    // db query for all movies under movie_db
    db.query(`SELECT * FROM movies`, (err, result) => {
        if (err) {
            console.error(err);
        };
        res.json({
            data: result
        });
        console.log("Movies have been pulled: ", req.body);
    });
});

// shows reviews for movies
app.get("/api/movie-reviews", (req, res) => {

    // db query for all reviews under a specific movie
    db.query(`SELECT movies.movie_name AS movie, reviews.review FROM reviews LEFT JOIN movies ON reviews.movie_id = movies.id ORDER BY movies.movie_name;`, (err, result) => {
        if (err) {
            console.error(err);
        };
        res.json({
            data: result
        });
        console.log("Movies reviews have been pulled: ", req.body);
    });
});

// adds a movie to the database using movie param
// Example POST request {
//     "movie": "Django"
// }
app.post("/api/new-movie/", (req, res) => {
    console.log(req.body);

    // db query to add a movie using the movie param as the name
    db.query(`INSERT INTO movies (movie_name) VALUES (?)`, req.body.movie, (err, result) => {
        if (err) {
            console.error(err);
        };
        res.json({
            data: req.body
        });
        console.log("Movie has been sucessfully added: ", req.body);
    });
});

// updates a movie review for the selected movie using the movies param
// Example PUT request{
//     "id": 1,
//     "review": "10 out of ten."
// }
app.put("/api/update-review/", (req, res) => {
    console.log(req.body);

    // db query to update a param review with the review id of param id to the param movie.
    db.query(`UPDATE reviews SET review = ? WHERE id = ${req.body.id}`, [req.body.review, req.body.id], (err, result) => {
        if (err) {
            console.error(err);
        }
        else if (!result.affectedRows) {
            res.json({
                message: "Invalid movie."
            });
        }
        else {
            res.json({
                message: "Update successful.",
                data: req.body,
                changes: result.affectedRows
            });
        };
    });
});

// deletes a review with the review id of the id param from the movie param
// Example DELETE request{
//     "id": 1,
// }
app.delete("/api/delete-review/", (req, res) => {
    console.log(req.params.id);

    // db query to delete a review using the params id and movie
    db.query(`DELETE FROM movies WHERE id = ${req.body.id}`, [req.body.id], (err, result) => {
        if (err) {
            console.error(err);
        }
        else if (!result.affectedRows) {
            res.json({
                message: "Invalid movie."
            });
        }
        else {
            res.json({
                message: "Delete successful.",
                id: req.body.id,
                changes: result.affectedRows
            });
        };
    });
});

app.listen(PORT, () => {
    console.log("Listening on PORT ", PORT);
});