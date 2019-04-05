$(document).ready(function() {

    function displayPokemon(pokemon) {
        
        let queryURL = "https://pokeapi.co/api/v2/pokemon/" + pokemon;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            $("<img />").attr("src",response.sprites["front_default"])
            .addClass("text-center")
            .appendTo("#poketop");
            $("<li />").text(response.name.toUpperCase())
            .appendTo("#statlist");
        })

    }

    displayPokemon("pikachu");

    function displayPokeGif(pokemon) {
        let queryURL = "http://api.giphy.com/v1/gifs/search?q=" + pokemon + "&api_key=a1G6lyUPmDUgPWu9HZQdwpAH95RFBf4T&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            console.log(response);
            console.log(response.data[0]["images"]["fixed_height_small"]["url"]);
            for (let i = 0; i < 10; i++){
                let stillURL = response.data[i]["images"]["fixed_height_small_still"]["url"];
                let animatedURL = response.data[i]["images"]["fixed_height_small"]["url"];
                let gifDiv = $("<div />").addClass("m-1");
                
                $("<img />").attr("src",stillURL)
                .attr("still",stillURL)
                .attr("animated",animatedURL)
                .addClass("gif")
                .appendTo(gifDiv);

                $("<p />").text("Rating: " + response.data[i]["rating"].toUpperCase())
                .appendTo(gifDiv);
                
                gifDiv.appendTo("#gif-box");
            }
            
        })
    }

    $(document).on("click","#pokebutton",function(event){
        console.log("it works!");
        $("#gif-box").empty();
        displayPokeGif("pikachu");
    });

    $(document).on("click",".gif",function(event){
        if($(this).attr("src") === $(this).attr("still")){
            $(this).attr("src",$(this).attr("animated"));
        } else {
            $(this).attr("src",$(this).attr("still"));
        }
    });
});