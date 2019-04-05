$(document).ready(function() {

    function capitalizeFirst(word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

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
            $("<p />").text(capitalizeFirst(response.name))
            .addClass("text-white")
            .appendTo("#poketop");
            $("<li />").text("Type: " + capitalizeFirst(response.types[0]["type"]["name"]))
            .appendTo("#statlist");
            $("<li />").text("Attack: " + response.stats[4]["base_stat"])
            .appendTo("#statlist");
            $("<li />").text("Special Attack: " + response.stats[2]["base_stat"])
            .appendTo("#statlist");
            $("<li />").text("Speed: " + response.stats[0]["base_stat"])
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

    $(document).on("click","#gifbutton",function(event){
        console.log("it works!");
        $("#gif-container").addClass("border border-light");
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