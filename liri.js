require("dotenv").config();
var twitter = require('twitter')
var spotify = require('spotify')
var request = require('request')
var fs = require('fs')
var keys = require('./keys.js')

var arg = process.argv[2]
var itemSearch = process.argv[3]

switch(command){
    case "my-tweets":
        twitterSearch();
    break;
    case "spotify-this-song":
        spotifySearch()
    break;
    case "movie-this":
        omdbSearch()
    break;
  
    case "do-what-it-says":
        doThing();
    break;
  
    default:
      console.log("{Please enter a command: my-tweets, spotify-this-song, movie-this, do-what-it-says}");
    break;
  }

  function printSpotifySearch() {
    console.log(d.tracks.items[i].name);
    console.log(d.tracks.items[i].artists[0].name);
    console.log(d.tracks.items[i].external_urls.spotify)
    console.log(d.tracks.items[i].album.name)
  }