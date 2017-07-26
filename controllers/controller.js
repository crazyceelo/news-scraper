// Create the router
// import express and set up router function
var express = require("express");
var router = express.Router();
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

router.get("/", function(req, res){
    res.render("index");
})



module.exports = router;


var request = require("request");
var cheerio = require("cheerio");
var Article = require("../models/Article.js");
var Note = require("../models/Note.js");

router.get("/scrape", function(req, res){
    request("https://www.mmafighting.com/", function(error, response, html){
        var $ = cheerio.load(html);
        $("h2.c-entry-box--compact__title").each(function(i, element){
            var result = {};

            result.title = $(this).children("a").text();
            result.link = $(this).children("a").attr("href");

            var entry = new Article(result);

            entry.save(function(err, doc){
                if(err){
                    console.log(err);
                }
                else{
                    console.log(doc);
                }
            })
        })  
    })
    res.send("scrape complete");
})

router.get("/articles", function(req, res){
    Article.find({})
    .populate("note")
    .exec(function(error, data) {
        console.log(data);
        if(error){
            res.json(error)
        }
        else{
            res.render("index", {"articles": data});
        }
    })
})

// router.post("/articles/:id", function(req, res){
//     console.log(req.body);
// })

// Create a new note or replace an existing note
router.post("/articles/:id", function(req, res) {
  // Create a new note and pass the req.body to the entry
  var newNote = new Note(req.body);

  // And save the new note the db
  newNote.save(function(error, doc) {
    // Log any errors
    if (error) {
      console.log(error);
    }
    // Otherwise
    else {
      // Use the article id to find and update it's note
      Article.findOneAndUpdate({ "_id": req.params.id }, { "note": doc._id })
      // Execute the above query
      .populate("note")
      .exec(function(err, doc) {
        // // Log any errors
        // if (err) {
        //   console.log(err);
        // }
        // else {
        //   // Or send the document to the browser
          res.json(doc);
        //     // console.log(doc.notes);
        //     // res.render("/articles", doc);
        //     // res.redirect({"notes": doc}, "/articles");
        //     // res.redirect("/articles", {"notes": doc});
        //     // res.redirect("/articles");
        // }
      });
    }
  });
});