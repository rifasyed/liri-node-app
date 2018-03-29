require("dotenv").config();
var Twitter = require('twitter')
var spotify = require('spotify')
var request = require('request')
var fs = require('fs')
var keys = require('./keys.js')

var arg = process.argv[2]
var search = process.argv[3]

