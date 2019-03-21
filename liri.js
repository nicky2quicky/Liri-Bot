require("dotenv").config();
var keys = require("./keys.js");

// Trying new npm package chalk
const chalk = require("chalk");

// ESTABLISHING ALL VARIABLES-------------------------
var Spotify = require("node-spotify-api");
// Calling to the .env to pull the spotify API Keys
const env = process.env;
var spotify = new Spotify({
  id: env.SPOTIFY_ID,
  secret: env.SPOTIFY_SECRET
});

// Calling required packages to run the functions
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");

var query = process.argv;
var type = process.argv[2];
var array = [];

//In case the search has multiple words-------------------------------
for (var i = 3; i < query.length; i++) {
  array.push(query[i]);
  array.push("+");
}
array.splice(-1);

var validSearch = array.join("");

//Switch statement for the commands entered for movies, concert, spotify. Defining the commands in case and creating the functions below.
switch (type) {
  case "movie-this":
    movieThis();
    break;

  case "concert-this":
    concertThis();
    break;

  case "spotify-this-song":
    spotifyThis();
    break;

  case "do-what-it-says":
    doIt();
    break;

  default:
    console.log(
      "Please enter a valid command 'movie-this' 'concert-this' 'spotify-this-song' or 'do-what-it-says"
    );
}

// MOVIES (movie-this) ---------------------------

function movieThis() {
  if (validSearch === "") {
    validSearch = "mr+nobody";
  }
// Calling axios OMBA
  axios
    .get(
      "http://www.omdbapi.com/?t=" +
        validSearch +
        "&y=&plot=short&apikey=trilogy"
    )
    .then(function(response) {
      var movie = response.data;

      console.log(chalk.bgRed("************** Title **************"));
      console.log(chalk.blue(movie.Title));
      console.log(chalk.bgRed("************** Year **************"));
      console.log(chalk.blue(movie.Year));
      console.log(chalk.bgRed("************** imdb Rating **************"));
      console.log(chalk.blue(movie.imdbRating));
      console.log(
        chalk.bgRed("************** Rotten Tomoates Score **************")
      );
      console.log(chalk.blue(movie.Ratings[1].Value));
      console.log(chalk.bgRed("************** Country **************"));
      console.log(chalk.blue(movie.Country));
      console.log(chalk.bgRed("************** Language **************"));
      console.log(chalk.blue(movie.Language));
      console.log(chalk.bgRed("************** Plot **************"));
      console.log(chalk.blue(movie.Plot));
      console.log(chalk.bgRed("************** Actors **************"));
      console.log(chalk.blue("Actors: " + movie.Actors));
    });
}

// CONCERTS (conert-this)

function concertThis() {
  if (validSearch === "") {
    console.log("Invalid - please try again");
  } else {
    axios
      .get(
        "https://rest.bandsintown.com/artists/" +
          validSearch +
          "/events?app_id=codingbootcamp"
      )
      .then(function(response) {
        console.log(response.data[0].venue.name);

        if (response.data.length === 0) {
          console.log("No info for this artist");
        } else {
          for (var i = 0; i < response.data.length; i++) {
            console.log(chalk.bgBlue("************** Venue Name **************"));
            console.log(chalk.cyan(response.data[i].venue.name));
            console.log(chalk.bgBlue("************** Venue City **************"));
            console.log(chalk.cyan(response.data[i].venue.city));
            console.log(chalk.bgBlue("************** Date **************"));
            console.log(chalk.cyan(moment(response.data[i].datatime).format("LL")));
          }
        }
      });
  }
}

//SPOTIFY (spotify-this-song)

function spotifyThis() {
  if (validSearch === "") {
    validSearch = "ace+of+base+the+sign";
  }

  spotify.search(
    {
      type: "artist,track",
      query: validSearch
    },
    function(err, data) {
      if (err) {
        return console.log("Error occurred: " + err);
      }
      console.log(chalk.red.underline("ARTIST"));
      console.log(chalk.yellow.bgBlue(data.tracks.items[0].artists[0].name));
      console.log(chalk.red.underline("SONG NAME"));
      console.log(chalk.yellow.bgBlue(data.tracks.items[0].name));
      console.log(chalk.red.underline("PREVIEW SONG LINK"));
      console.log(chalk.yellow.bgBlue(data.tracks.items[0].preview_url));
      console.log(chalk.red.underline("ALBUM TITLE"));
      console.log(chalk.yellow.bgBlue(data.tracks.items[0].album.name));
    }
  );
}

// DO WHAT IT SAYS

function doIt() {
    fs.readFile("random.txt", "utf8", function(error, data) {

        if(error){
            return console.log(error);
        }

        var dataArray = data.split(",");
        validSearch = dataArray[1];
        spotifyThis();
    }
    )}
