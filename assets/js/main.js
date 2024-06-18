const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

let offset = 0
const limit = 5
const maxRecords = 151

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) =>
            `<a href="detalhes.html"><li class="pokemon ${pokemon.type}">
                <span class="numero">#${pokemon.number}</span>
                <span class="nome">${pokemon.name}</span>

                <div class="detalhes">
                    <ol class="tipos">
                        ${pokemon.types.map((type) => `<li class="tipo ${type}">${type}</li>`).join('')}
                    </ol>

                    <img src="${pokemon.photo}"
                        alt="${pokemon.name}">
                </div>
            </li></a>
            `).join('')
            pokemonList.innerHTML += newHtml 

})

}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordNexPage = offset + limit


    if (qtdRecordNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    }
    else {
        loadPokemonItens(offset, limit)
    }
    
})

