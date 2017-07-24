var request = require("request");
var cheerio = require("cheerio");


module.exports = (req, res)=>{
    app.get("/scrape", function(req, res){
        request("https://www.mmafighting.com/", function(error, response, html){
          var $ = cheerio.load(html);
          $("").each(function(i, element){
              var result = {};

              result.title = $(this).children("a").text();
              result.body = $(this).children("a").text();

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
}