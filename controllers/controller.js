// Create the router
// import express and set up router function
var express = require("express");
var router = express.Router();

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
    res.redirect("/");
})

router.get("/articles", function(req, res){
    Article.find({}, function(error, data){
        if(error){
            res.json(error)
        }
        else{
            res.render("index", {"articles": data});
        }
    })
})

router.post("/articles:id", function(req, res){
    var newNote = new Note(req.body);

    newNote.save(function(error, doc){
        if(error){
            console.log(error);
        }
        else{
            Article.findOneAndUpdate({}, {"_id": doc.params._id}, {"note": doc._id}).exec(function(err, doc){
                if (err){
                    console.log(err);
                }
                else{
                    res.json(doc);
                    // res.render("index", {"notes": doc});
                }
            })
        }
    })
})
