"use strict"

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
    const url = `https://pokeapi.co/api/v2/pokemon/${userPokemonInput}`
    fetch(url)
        .then(function (data) {
            console.log(data)
            let userPokemon = data.json()
            console.log(userPokemon)
        })
}
