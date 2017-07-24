// server and database set up
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

// require Note.js and Article.js models
var Note = require("./models/Note.js");
var Article = require("./models/Article.js");

// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promose = Promise;

// Initialize Express
var app = express();

// Use morgan and body parser with the app
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
    extended: false
}));

// Make public a static dir
mongoose.connect("mongodb://localhost/data");
var db = mongoose.connection;

// show any mongoose errors
db.on("error", function(error){
    console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function(){
    console.log("Mongoose connection successfull");
});


app.listen(3000, function(){
    console.log("App running on port 3000!");
});