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
            $("<li />").text(response.name)
            .appendTo("#statlist");
            $("<li />").text(response.types[0]["type"]["name"])
            .appendTo("#statlist");
        })

    }

    displayPokemon("pikachu");

    function displayPokeGif(pokemon) {
        let queryURL = "http://api.giphy.com/v1/gifs/search?q=" + pokemon + "&api_key=a1G6lyUPmDUgPWu9HZQdwpAH95RFBf4T&limit=5";
        
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            console.log(response);
        })
    
    
    }

    $(document).on("click","#pokebutton",function(event){
        console.log("it works!");
        console.log(displayPokeGif("pikachu"));
    });
});