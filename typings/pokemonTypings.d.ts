declare namespace PokemonTypings {
    export type PokemonType = {
        slot: number,
        type: {
            name: string,
            url: string
        }
    }
    
    export type PokemonSprite = {
        back_female: string
        back_shiny_female: string
        back_default: string
        front_female: string
        front_shiny_female: string
        back_shiny: string
        front_default: string
        front_shiny: string
    }
    
    export type PokemonData = {
        id: number,
        name: string,
        types: PokemonType[]
        sprites : PokemonSprite
    }
}
