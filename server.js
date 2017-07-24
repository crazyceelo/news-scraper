// server and database set up
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var override = require("method-override");
var path = require("path");

// require the config
var config = require("./config/connection.js");

// require Note.js and Article.js models
var Note = require("./models/Note.js");
var Article = require("./models/Article.js");

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

// Import the controller and give the server access to controller
var routes = require("./controllers/controller.js");
app.use("/", routes);


app.listen(3000, function(){
    console.log("App running on port 3000!");
});