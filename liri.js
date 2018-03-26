// initialize file system
require("dotenv").config()

//NPM Packages
var request = require("request")
var inquirer = require("inquirer")
var Twitter = require("twitter")
var Spotify = require("node-spotify-api")

//Local Files
var keys = require('./keys')
var fs = require('fs')

//Creates an object to auth Spotify queries
var spotify = new Spotify(keys.spotify)
var action = process.argv[2]
var b = process.argv[3]

//Creates an object to authenticate Twitter queries
var client = new Twitter(keys.twitter)
//Limmit to 20 Tweets
var limitTweets = 20;

switch (action) {
    case "my-tweets":
        myTweets()
        break;
    case "spotify-this-song":
        mySpotify()
        break;
    case "movie-this":
        myMovie()
        break;
    case "do-what-it-says":
        random()
        break;
    default: 
// Adds user instructions to re-select an available action
        console.log("LIRI doesnt know that!")
        console.log("my-tweets, spotify-this-song, movie-this, do-what-it-says")
        break;

//  ---------------------------Twitter API-------------------------------  //
        function myTweets() {
            var params = { screen_name: 'ProgramOlivia' }
            client.get('statuses/user_timeline', params, function (error, tweets, response) {
                if (!error) {
                    console.log(tweets)
                    for(var i = 0; i < tweets.length; i++) {
                        console.log(tweets[i.created_at])
                        console.log(' ')
                        console.log(tweets[i].text)
                    }
                }
            });
        }
        myTweets()
//  --------------------------Spotify API----------------------------------  //
        // Artist(s)
        // The song's name
        // A preview link of the song from Spotify
        // The album that the song is from
        var getArtistNames = function(artist) {
            return artist.name;
        }

        var mySpotify = function (song) {
            spotify.search({ type: 'track', query: song }, function (err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err)
                }
                console.log(data.tracks.items)
                for (var i = 0; i < songs.length; i++) {
                    console.log(i)
                    console.log('artist(s): ' + songs[i].artists.map(getArtistNames));
                    console.log('song name: ' + songs[i].name);
                    console.log('preview songs: ' + songs[i].preview_utl);
                    console.log('album ' + songs[i].album.name);
                    console.log('---------------------------------------');
                }
            });
        }
        mySpotify(b)

//  -------------------------- Movies API ----------------------------------  //
        // * Title of the movie.
        // * Year the movie came out.
        // * IMDB Rating of the movie.
        // * Rotten Tomatoes Rating of the movie.
        // * Country where the movie was produced.
        // * Language of the movie.
        // * Plot of the movie.
        // * Actors in the movie.

        var myMovie = function () {

        }

        myMovie()
//  -------------------------- Do what it says ---------------------------- //
        // takes the data from my random.txt file and 
        // passes it as a search value in the Spotify function
        // node liri.js do -what - it - says
        // Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
        // It should run spotify - this - song for "I Want it That Way," as follows the text in random.txt.
        // Feel free to change the text in that document to test out the feature for other commands.

        function random() {

            fs.readFile('./random.txt', 'utf8', function (err, data) {
                if (err) {
                    return console.log(err)
                } else {
                    console.log(data)

    //Convert data in text file into array
                    var arr = data.split(",")
                    value = arr[1];
    // If command name at index[0] matches the string, invoke the function
                    if (arr[0] === "movie-this") {
                        myMovie(value)
                    }
                    else if (arr[0] === "spotify-this-song") {
                        mySpotify(value)
                    }
                    else if (arr[0] === "my-tweets") {
                        myTweets();
                    }
                }
            })
        }
        random()
    }