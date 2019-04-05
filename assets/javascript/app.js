$(document).ready(function() {

    function displayPokemon(pokemon) {
        
        var queryURL = "https://pokeapi.co/api/v2/pokemon/" + pokemon;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);
        })

    }

    displayPokemon("haxorus");
});