
const baseUrlApi = "https://pokeapi.co/api/v2"

export async function fetchPokemonData (value : string): Promise<PokemonTypings.PokemonInformation> {
    const pokemonData =  await fetchInfo<PokemonTypings.PokemonData>(`${baseUrlApi}/pokemon/${value}`)
    const pokemonSpecies = await fetchInfo<PokemonTypings.PokemonSpecies>(`${baseUrlApi}/pokemon-species/${value}`)
    return {pokemonData: pokemonData, pokemonSpecies: pokemonSpecies }
}

export async function fetchTypesData (types: string []): Promise<PokemonTypings.TypeEffectiveness[]> {
    const typeEffectiveness = await Promise.all(types.map(name=> fetchInfo<PokemonTypings.TypeEffectiveness>(`${baseUrlApi}/type/${name}`))) 
    return typeEffectiveness
}

async function fetchInfo<T>(url: string) : Promise<T> {
    const response = await fetch(url)
    const data = await response.json()
    return data
}