
const baseUrlApi = "https://pokeapi.co/api/v2"

export default async function fetchPokemonData<T> (value : string): Promise<T> {
    const response = await fetch(`${baseUrlApi}/pokemon/${value}`)
    const pokemonData = await response.json()
    return pokemonData
}