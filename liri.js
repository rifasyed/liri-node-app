require("dotenv").config();
var keys = require('./keys.js')


// var twitter = require('twitter')
// var spotify = require('spotify')
// var request = require('request')
// var fs = require('fs')
// var keys = require('./keys.js')
// var path = random.txt
var Spotify = require('node-spotify-api')
var spotify = new Spotify(keys.spotify);
var request = require('request')
var Twitter = require('twitter')
var client = new Twitter(keys.twitterKeys)
var fs = require('fs')

var arg = process.argv[2]
var itemSearch = process.argv[3]

switch(arg){
    case "my-tweets":
        twitterSearch()
        break;

    case "spotify-this-song":
        spotifySearch()
        break;

    case "movie-this":
        omdbSearch()
        break;
    
    case "do-what-it-says":
        doTheThing()
        break;
    
    default:
        console.log("Please enter one of the following commands: my-tweets, spotify-this-song, movie-this, do-what-it-says")
        break;
}

function twitterSearch() {
    var client = new Twitter(keys.twitter);
    var username = {user_name: 'f0rkm3'}
    
    client.get('statuses/user_timeline', username, function(error, tweets, response){
        
        if(!error) {
            for(var i = 0; i<tweets.length; i++){
                var date = tweets[i].created_at
                console.log("@f0rkm3: " + tweets[i].text + " Created At: " + date.substring(0, 19));
                console.log("-----------------------")
                
                //adds text to log.txt file
                fs.appendFile('log.txt', "@f0rkm3: " + tweets[i].text + " Created At: " + date.substring(0, 19), function (e) {
                    if (e) { console.log(e) }
                })
                fs.appendFile('log.txt', "-----------------------", function (e) {
                    if (e) { console.log(e) }
                })
            }
        } else {
            console.log('Error: ' + error)
        }
    })
}

function spotifySearch(song) {
    var song = process.argv[3]
    spotify.search({ type: 'track', query: song}, function(e, d) {
        if(!e) {
            for(var i = 0; i < d.tracks.items.length; i++) {
                var songData = d.tracks.items[i]
                console.log("Artist: " + songData.artists[0].name)
                console.log("Song: " + songData.name)
                console.log("Preview URL: " + songData.preview_url)
                console.log("Album: " + songData.album.name)
                console.log("-----------------------")
                
                fs.appendFile('log.txt', songData.artists[0].name, function (e) {
                    if (e) { console.log(e) }
                })
                fs.appendFile('log.txt', songData.name, function (e) {
                    if (e) { console.log(e) }
                })
                fs.appendFile('log.txt', songData.preview_url, function (e) {
                    if (e) { console.log(e) }
                })
                fs.appendFile('log.txt', songData.album.name, function (e) {
                    if (e) { console.log(e) }
                })
                fs.appendFile('log.txt', "-----------------------", function (e) {
                    if (e) { console.log(e) }
                })
            }
        } else {
            console.log('Error: ' + e)
        }
    })
}


function omdbSearch(movie) {
    var omdbURL = 'http://www.omdbapi.com/?t=' + movie + '&plot=short&tomatoes=true'
  
    request(omdbURL, function (error, response, body){
        if(!error && response.statusCode == 200){
            var body = JSON.parse(body)
  
            console.log("Title: " + body.Title)
            console.log("Release Year: " + body.Year)
            console.log("IMdB Rating: " + body.imdbRating)
            console.log("Plot: " + body.Plot)
            console.log("Actors: " + body.Actors)
    
            //adds text to log.txt
            fs.appendFile('log.txt', "Title: " + body.Title, function (e) {
                    if (e) { console.log(e) }
                })
            fs.appendFile('log.txt', "Release Year: " + body.Year, function (e) {
                    if (e) { console.log(e) }
                })
            fs.appendFile('log.txt', "IMdB Rating: " + body.imdbRating, function (e) {
                    if (e) { console.log(e) }
                })
            fs.appendFile('log.txt', "Plot: " + body.Plot, function (e) {
                    if (e) { console.log(e) }
                })
            fs.appendFile('log.txt', "Actors: " + body.Actors, function (e) {
                    if (e) { console.log(e) }
                })
  
        } else {
            console.log('Error: ' + error)
        }
    })
  
  }

function doTheThing() {
    fs.readFile('random.txt', "utf8", function(e, d) {
        var txt = d.split(',')
        spotifySong(txt[1])
    // command = console.log(command)
    })
  }
  