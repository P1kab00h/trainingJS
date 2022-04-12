let pokeContainer = document.getElementById('poke-container')
let pokeCount = 151
let colors = {
    fire: '#fddfdf',
    grass: '#defde0',
    electric: '#fcf7de',
    water: '#def3de',
    ground: '#f4e7da',
    rock: '#d5d5d4',
    fairy: '#fceaff',
    poison: '#98d7a5',
    bug: '#f8d5a3',
    dragon: '#97b3e6',
    psychic: '#eaeda1',
    flying: '#f5f5f5',
    fighting: '#e6e0d4',
    normal: '#f5f5f5',
}
// ici je recrée une array reprenant les types et leurs associant un index
let mainTypes = Object.keys(colors)

let fetchPokemons = async () => {
    for (let i = 1; i <= pokeCount; i++) {
        await getPokemon(i)
    }
}

let getPokemon = async (id) => {
    //je défini mon URL d'API
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    // je transforme mon result en json grace à fetch(), cette variable sera en await => asynchrone
    let response = await fetch(url, {method: "get"});

    if (response.ok) {
        let data = await response.json();
        //  appel de la fonction de creation de carte pokemon qui nous permettra de générer les cartes nécessaires en fonction du retour api
        // Les données récupérées dans data seront donc injectées dans notre modéle de carte
        createPokeCard(data);
    }
}

let createPokeCard = (pokemon) => {
    // par défaut lesn oms sont en minuscule, je souhaite avoir la Première lettre en MAJ
    // Je passe donc l'index de la lettre que je souhaite voir en majuscule (0) auquel j'ajoute (+) le slice à partir de l'index 1 et jusqu'à la fin du nom
    let name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    // récupération de l'id du pokemon (transformé en string) auquel j'ajoute au début de la chaine de caractère des 0 afin que la chaîne atteigne trois caractères
    let id = pokemon.id.toString().padStart(3, '0')
    // concernant le type il s'agit d'une nouvelle array, je dois donc passer sur celle-ci, ici en utilisant map()
    let poke_types = pokemon.types.map(type => type.type.name)
    // le type sera trouvé en cherchant dans l'array mainTypes si le type existe, si c'est le cas je récupére son index, ce qui me permet de récupérer le type en toutes lettres
    let type = mainTypes.find(type => poke_types.indexOf(type) > -1)
    // ici je récupére, en fonction du type majeur du pokemon la couleur qui lui est associé
    let color = colors[type]
    const pokeEl = document.createElement('div')
    pokeEl.classList.add('pokemon')
    pokeEl.style.backgroundColor = color
    let pokeInnerHtml = `
        <div class="img-container">
<!--            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="${name}">-->
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png" alt="${name}">
        </div>
        <div class="info">
            <span class="number">#${id}</span>
            <h3 class="name">${name}</h3>
            <small class="type">type : <span>${type}</span></small><br>
            <small>poids : <span>${pokemon.weight}</span></small><br>
            <small>taille : <span>${pokemon.height}</span></small>
        </div>
    `
    pokeEl.innerHTML = pokeInnerHtml;
    pokeContainer.appendChild(pokeEl)

    console.log(pokemon)
}

fetchPokemons();


