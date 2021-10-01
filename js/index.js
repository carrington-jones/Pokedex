"use strict"

$(document).ready(function () {
    fetchPokemon();
    // $('.pokemonSearchCard').hide()
});


const fetchPokemon = () => {
    const promises = []; // Start off with an empty array of promises
    for (let i = 1; i <= 150; i++) {
        const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(pokemonUrl).then((res) => res.json())); //For each one of our requests we push them to promise array
    }
    Promise.all(promises).then((results => {
        const pokemon = results.map((data) => ({ //iterating through each result, going to get a reference to each one of those. With each one of those it then converts it to our built object
            name: capitalizeFirstLetter(data.name),
            id: data.id,
            image: data.sprites['front_default'],
            type: data.types.map(type => capitalizeFirstLetter(type.type.name)).join(', ') //This grabs each name in type and creates a new array. It then joins them into a string.
        }));
        displayPokemon(pokemon, "pokedex")
    }))
};

const displayPokemon = ((pokemon, divId) => {
    console.log(pokemon)
    const pokemonHTMLString = pokemon.map(pokeman =>
        `
        <div class="col-3"
        <div class="card">
        <img class="card-img-top" src="${pokeman.image}"/>
        <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
            <p class="card-text">Type: ${pokeman.type}</p>
        </div>`).join('');

    $('#'+ divId).html(pokemonHTMLString)
})

//Used to capitalize letters for data from API.
const capitalizeFirstLetter = (string =>{
    return string.charAt(0).toUpperCase() + string.slice(1);
})

$("#userPokemonInputBtn").click(function (e) {
    e.preventDefault();
    getPokemonData();
    $('#pokedex').hide()
})

$("#userPokemonInput").on('keypress', function (e) {
    if (e.keyCode === 13) {
        e.preventDefault();
        getPokemonData()
        $('#pokedex').hide()
    }
});

function getPokemonData() {
    let userPokemonInput = $("#userPokemonInput").val()
    const promises = [];
    let url = `https://pokeapi.co/api/v2/pokemon/${userPokemonInput}`
    promises.push(fetch(url).then((data) => data.json()))
    Promise.all(promises).then((results => {
        const pokemon = results.map((data) => ({ //iterating through each result, going to get a reference to each one of those. With each one of those it then converts it to our built object
            name: capitalizeFirstLetter(data.name),
            id: data.id,
            image: data.sprites['front_default'],
            type: data.types.map(type => capitalizeFirstLetter(type.type.name)).join(', ') //This grabs each name in type and creates a new array. It then joins them into a string.
        }));
        displayPokemon(pokemon, "userPokemonSearchDisplay")
    }))
}

