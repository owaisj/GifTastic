$(document).ready(function() {
    let billsPokemon = [];
    let kantoStarters = ["pikachu","eevee","bulbasaur","charmander","squirtle"];
    let hoennStarters = ["treecko","torchic","mudkip"];
    let johtoStarters = ["chikorita","cyndaquil","totodile"];

    function capitalizeFirst(word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }
    function displayPokemon(pokemon) {
        let queryURL = "https://pokeapi.co/api/v2/pokemon/" + pokemon;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            //TODO: Streamline these with template literal
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
    function displayPokeGif(pokemon) {
        let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + pokemon + "&api_key=a1G6lyUPmDUgPWu9HZQdwpAH95RFBf4T&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            for (let i = 0; i < 10; i++){
                //TODO
                let stillURL = response.data[i]["images"]["fixed_height_small_still"]["url"];
                let animatedURL = response.data[i]["images"]["fixed_height_small"]["url"];
                let gifDiv = $("<div />").addClass("gifDiv m-1");
                let infoList = $("<ul />");
                let tags = response.data[i]["slug"];
                let tagArray = tags.split("-");
                tagArray.pop();
                
                $("<img />").attr("src",stillURL)
                .attr("still",stillURL)
                .attr("animated",animatedURL)
                .addClass("gif")
                .appendTo(gifDiv);

                $("<li />").text("Title: " + response.data[i]["title"])
                .appendTo(infoList);
                $("<li />").text("Tags: " + tagArray.join(", "))
                .appendTo(infoList);
                $("<li />").text("Rating: " + response.data[i]["rating"].toUpperCase())
                .appendTo(infoList);
                $("<a />").addClass("fas fa-link text-danger")
                .attr("href", response.data[i]["images"]["original"]["url"])
                .attr("download","")
                .appendTo("<li />")
                .appendTo(infoList);
                
                gifDiv.append(infoList)
                .prependTo("#gif-box");
            }
            
        })
    }

    function createButton(name) {
        //TODO
        let userBtn = $("<button />");
        userBtn.addClass("pokebutton btn btn-danger m-1")
        .attr("value",name)
        .text(capitalizeFirst(name));
        return userBtn;
    }
    function displayButton (starters, region) {
        starters.forEach(function(name){
            name.appendTo(`#${region}-box`);
        })
    }
    (function () {
        let kantoButtons = kantoStarters.map(createButton);
        let johtoButtons = johtoStarters.map(createButton);
        let hoennButtons = hoennStarters.map(createButton);
        displayButton(kantoButtons,"kanto");
        displayButton(johtoButtons,"johto");
        displayButton(hoennButtons,"hoenn");
    })();

    $(document).on("click","#gifbutton",function(event){
        $("#gif-container").addClass("border border-danger bg-light");
        $("#gif-box").empty();
        displayPokeGif($(this).attr("value"));
        window.scrollTo({
            top: 750,
            behavior: "smooth"
        })
    });
    $(document).on("click",".gif",function(event){
        if($(this).attr("src") === $(this).attr("still")){
            $(this).attr("src",$(this).attr("animated"));
        } else {
            $(this).attr("src",$(this).attr("still"));
        }
    });
    $(document).on("click",".pokebutton",function(event){
        $("#poketop").empty();
        $("#statlist").empty();
        displayPokemon($(this).attr("value"));
        $("#gifbutton").attr("value",$(this).attr("value"));
        window.scrollTo({
            top: 250,
            behavior: "smooth"
        })
    });
    $(document).on("click","#add-pokemon",function(event){
        event.preventDefault();
        $("#user-box").empty();
        let userPokemonButtons = [];
        let pokemon = $("#poke-input").val();
        $("#poke-input").val('')
        if (pokemon === "") {
            $("<div />").addClass("alert alert-danger")
            .text("Please enter a name")
            .appendTo($("#user-box"));
        } else {
            billsPokemon.push(pokemon.toLowerCase());
            userPokemonButtons = billsPokemon.map(createButton);
            displayButton(userPokemonButtons,"user")
        } 
    })
});