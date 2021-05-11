export default function reducer<S>(state: PokemonTypings.SearchPokemonState, action: PokemonReducerTypes.Action): PokemonTypings.SearchPokemonState {
    switch (action.type) {
        case 'success': 
            return {...state, pokemonInformation:{ pokemonData: action.results.pokemonData, pokemonSpecies: action.results.pokemonSpecies}};
            break
        case 'failure': 
            return {...state, error: action.error};
}}