"use strict"

$(document).ready(function () {
    fetchPokemon();
    $('.pokemonSearchCard').hide()
});


const fetchPokemon = () => {
    const promises = []; // Start off with an empty array of promises
    for (let i = 1; i <= 150; i++) {
        const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(pokemonUrl).then((res) => res.json())); //For each one of our requests we push them to promise array
    }
    Promise.all(promises).then((results => {
        const pokemon = results.map((data) => ({ //iterating through each result, going to get a reference to each one of those. With each one of those it then converts it to our built object
            name: data.name,
            id: data.id,
            image: data.sprites['front_default'],
            type: data.types.map(type => type.type.name).join(', ') //This grabs each name in type and creates a new array. It then joins them into a string.
        }));
        displayPokemon(pokemon)
    }))
};

$("#userPokemonInputBtn").click(function (e) {
    e.preventDefault();
    getPokemonData();
})

$("#userPokemonInput").on('keypress', function (e) {
    if (e.keyCode === 13) {
        e.preventDefault();
        getPokemonData()
    }
});

function getPokemonData() {
    let userPokemonInput = $("#userPokemonInput").val()
    let url = `https://pokeapi.co/api/v2/pokemon/${userPokemonInput}`
    fetch(url)
        .then(function (data) {
            let userPokemon = data.json()
            console.log(userPokemon)
        })
}

const displayPokemon = (pokemon => {
    console.log(pokemon)
    const pokemonHTMLString = pokemon.map(pokeman =>
        `
    <li>
        <img src="${pokeman.image}"/>
        <h2>${pokeman.id}.${pokeman.name}</h2>
            <p>Type: ${pokeman.type}</p>
        </li>
        `)
    $('#pokedex').html(pokemonHTMLString)
    })
