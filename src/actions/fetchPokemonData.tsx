
const baseUrlApi = "https://pokeapi.co/api/v2"

export default async function fetchPokemonData (value : string): Promise<PokemonTypings.PokemonData> {
    const response = await fetch(`${baseUrlApi}/pokemon/${value}`)
    const pokemonData = await response.json()
    return {id: pokemonData.id, name: pokemonData.name, types: pokemonData.types, sprites: pokemonData.sprites}
}