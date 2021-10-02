"use strict"

$(document).ready(function () {
    fetchPokemon();
    // $('.pokemonSearchCard').hide()
});

const colors = {
    fire: '#FDDFDF',
    grass:'#DEFDE0',
    electric: '#FCF7DE',
    water: '#DEF3FD',
    ground: '#f4e7da',
    rock: '#d5d5d4',
    fairy: '#fceaff',
    poison: '#98d7a5',
    bug: '#f8d5a3',
    dragon: '#97b3e6',
    psychic: '#eaeda1',
    flying: '#F5F5F5',
    fighting: '#E6E0D4',
    normal: '#F5F5F5'
}


const fetchPokemon = () => {
    const promises = []; // Start off with an empty array of promises
    for (let i = 1; i <= 150; i++) { //Max is 898.
        const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(pokemonUrl).then((res) => res.json())); //For each one of our requests we push them to promise array
    }
    Promise.all(promises).then((results => {
        const pokemon = results.map((data) => ({ //iterating through each result, going to get a reference to each one of those. With each one of those it then converts it to our built object
            name: capitalizeFirstLetter(data.name),
            id: data.id,
            image: data.sprites['front_default'],
            type: capitalizeFirstLetter(data.types[0].type.name), //This grabs each name in type and creates a new array. It then joins them into a string.
            color: colors[data.types[0].type.name]
        }));
        displayPokemon(pokemon, "pokedex")
    }))
};

const displayPokemon = ((pokemon, divId) => {
    console.log(pokemon)

    const pokemonHTMLString = pokemon.map(pokeman =>
        `
        <div class="col-2">
        <div class="card mb-2 shadow-lg pokemonCard" style="background-color: ${pokeman.color} ">
        <img class="card-img-top" src="${pokeman.image}"/>
        <h3 class="card-title text-center">${pokeman.id}. ${pokeman.name}</h3>
            <p class="card-text text-center m-2">Type: ${pokeman.type}</p>
            </div>
        </div>`
    )





    $('#' + divId).html(pokemonHTMLString)
})

//Used to capitalize letters for data from API.
const capitalizeFirstLetter = (string => {
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

