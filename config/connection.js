// require mongoose database
var mongoose = require("mongoose");

// Database configuration with mongoose
mongoose.connect("mongodb://localhost/data");
var db = mongoose.connection;

// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promose = Promise;

// show any mongoose errors
db.on("error", function(error){
    console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function(){
    console.log("Mongoose connection successfull");
});

module.exports = mongoose;