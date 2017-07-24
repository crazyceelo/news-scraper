// server and database set up
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var override = require("method-override");
var path = require("path");

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
app.use(express.static("public"));

// Override with POST having ?_method=DELETE in handlebars file
app.use(override("_method"));

// import handlebars to use the main file
var handle = require("express-handlebars");
app.engine("handlebars", handle({defaultLayout: "main"}));
app.set("view engine", "handlebars");

// Database configuration with mongoose
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

// Import the controller and give the server access to controller
var routes = require("./controllers/controller.js");
app.use("/", routes);
app.listen(PORT);




app.listen(3000, function(){
    console.log("App running on port 3000!");
});