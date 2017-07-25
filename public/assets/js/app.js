$("#scrape-button").on("click", function(){
    window.location.href = "http://localhost:3000/scrape";
})

$("#display-button").on("click", function(data){
    window.location.href = "http://localhost:3000/articles";
})

$("#save-button").on("click", function(){
    // $("#notes-field").empty();
    var thisId = $(this).attr("data-id");
    window.location.href = "http://localhost:3000/articles/" + thisId;
})
