$(document).ready(function() {
    let pokeArray = [];

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
            //This can be changed to a template literal
            $("<img />").attr("src",response.sprites["front_default"])
            .addClass("text-center")
            .appendTo("#poketop");
            $("<p />").text(capitalizeFirst(response.name))
            .addClass("text-white")
            .appendTo("#poketop");
            //This can be an array with .map() method. Make an array with this information.
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
            console.log(response);
            
            for (let i = 0; i < 10; i++){
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
    function renderButtons() {
        for (let i = 0; i < pokeArray.length; i++) {
            let userBtn = $("<button />");
            userBtn.addClass("pokebutton btn btn-danger m-1")
            .attr("value",pokeArray[i])
            .text(capitalizeFirst(pokeArray[i]))
            .appendTo($("#user-pokemon"));
        }
    }

    $(document).on("click","#gifbutton",function(event){
        console.log("it works!");
        $("#gif-container").addClass("border border-danger bg-light");
        $("#gif-box").empty();
        displayPokeGif($(this).attr("value"));
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
        $("#user-pokemon").empty();
        let pokemon = $("#poke-input").val();
        if (pokemon === "") {
            $("<div />").addClass("alert alert-danger")
            .text("Please enter a name")
            .appendTo($("#user-pokemon"));
        } else {
            pokeArray.push(pokemon.toLowerCase());
            renderButtons();
        } 
    })
});