let button = document.querySelector("#searchButton")

button.addEventListener('click', async () => {

    let pokemonName = document.querySelector("#pokemonName")
    let pokemonImage = document.querySelector("#pokemonImage")
 
    let textInput = document.querySelector("#inputBar").value
    let pokemonAbilities = document.querySelector("#pokemonAbilities");
    let pokemonTypes = document.querySelector("#pokemonTypes");
    let shinyImage = document.querySelector("#shinyImage"); 
    let resultDetails = document.querySelector("#resultDetails");
    let searchType = document.querySelector("#searchType").value.toLowerCase();
    let evolutionDetails = document.querySelector("#evolutionDetails");

    //Axios call goes here
    //remember to use Async and Await!
    //DOM Setters go here
      const response = await axios.get(`https://pokeapi.co/api/v2/${searchType}/${textInput}`);

      const pokemonData = response.data;
      if(searchType==='pokemon'){
      pokemonName.textContent = pokemonData.name;
      pokemonImage.src = pokemonData.sprites.front_default;
      pokemonAbilities.textContent = `Abilities: ${pokemonData.abilities.map(ability => ability.ability.name).join(", ")}`;
      pokemonTypes.textContent = `Types: ${pokemonData.types.map(type => type.type.name).join(", ")}`;
      if (response.data.sprites.front_shiny) {
        shinyImage.src = response.data.sprites.front_shiny;
    } else {
        shinyImage.style.display = 'none';
    }
    
    const evolutionChainResponse = await axios.get(speciesData.evolution_chain.url);
    const evolutionChainData = evolutionChainResponse.data;
    evolutionDetails.textContent = `Evolution Chain: ${getEvolutionChain(evolutionChainData.chain)}`;
      }else if(searchType === "move"){
      pokemonName.textContent = pokemonData.name;
      pokemonImage.src = "";
      shinyImage.src = "";
      resultDetails.textContent = `Power: ${data.power}, Accuracy: ${data.accuracy}`;
      }else if (searchType === "berry") {
        pokemonName.textContent = pokemonData.name;
        pokemonImage.src = pokemonData.item.url;
        resultDetails.textContent = `Size: ${data.size}, Smoothness: ${data.smoothness}`;
    }
})

function getEvolutionChain(chain) {
    let evolutionDetails = chain.species.name;

    if (chain.evolves_to.length > 0) {
        evolutionDetails += " -> " + getEvolutionChain(chain.evolves_to[0]);
    }

    return evolutionDetails;
}