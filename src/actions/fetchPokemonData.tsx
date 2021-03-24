
const baseUrlApi = "https://pokeapi.co/api/v2"

export default async function fetchPokemonData (value : string): Promise<any> {
    const response = await fetch(`${baseUrlApi}/pokemon/${value}`)
    return await response.json()
}