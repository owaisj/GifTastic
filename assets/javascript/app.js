$(document).ready(function() {

    function displayPokemon(pokemon) {
        
        var queryURL = "https://pokeapi.co/api/v2/pokemon/" + pokemon;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            $("<img />").attr("src",response.sprites["front_default"])
            .addClass("text-center")
            .appendTo("#poketop");
        })

    }

    displayPokemon("haxorus");
});