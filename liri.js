require("dotenv").config();
var keys = require("./keys.js");


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
