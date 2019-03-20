require("dotenv").config();
var keys = require("./keys.js");

// Trying new npm package chalk
const chalk = require('chalk');

// ESTABLISHING ALL VARIABLES-------------------------
var Spotify = require ('node-spotify-api');
// Calling to the .env to pull the spotify API Keys
const env = process.env;
var spotify = new Spotify({
    id: env.SPOTIFY_ID,
    secret: env.SPOTIFY_SECRET 
});
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");

var query = process.argv;
var type = process.argv[2];
var array = [];

//In case the search has multiple words-------------------------------
for (var i = 3; i < query.length; i++) {
    array.push(query[i]);
    array.push("+")
}
    array.splice(-1); 


var validSearch = array.join(""); 

//Switch statement for the commands entered for movies, concert, spotify
switch (type) {
    case "movie-this":
    movieThis()
    break;

    case "concert-this":
    concertThis()
    break;

    case "spotify-this-song":
    spotifyThis()
    break;

    case "do-what-it-says":
    doIt()
    break;

    default:
        console.log("Please enter a valid command 'movie-this' 'concert-this' 'spotify-this-song' or 'do-what-it-says");
}



// MOVIES (movie-this)

function movieThis() {

    if (validSearch === "") {
        validSearch = "mr+nobody"
    }

    axios.get("http://www.omdbapi.com/?t=" + validSearch + "&y=&plot=short&apikey=trilogy").then(
        function (response) {
        
    var movie = response.data;

    console.log(chalk.bgRed("************** Title **************"));
    console.log(chalk.blue(movie.Title));
    console.log(chalk.bgRed("************** Year **************"));
    console.log(chalk.blue(movie.Year));
    console.log(chalk.bgRed("************** imdb Rating **************"));
    console.log(chalk.blue(movie.imdbRating));
    console.log(chalk.bgRed("************** Rotten Tomoates Score **************"));
    console.log(chalk.blue(movie.Ratings[1].Value));
    console.log(chalk.bgRed("************** Country **************"));
    console.log(chalk.blue(movie.Country));
    console.log(chalk.bgRed("************** Language **************"));
    console.log(chalk.blue(movie.Language));
    console.log(chalk.bgRed("************** Plot **************"));
    console.log(chalk.blue(movie.Plot));
    console.log(chalk.bgRed("************** Actors **************"));
    console.log(chalk.blue("Actors: " + movie.Actors));
    
 
        }
    );

    
}
