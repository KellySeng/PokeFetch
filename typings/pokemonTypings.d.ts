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
        other: {
            "official-artwork": PokemonSprite
        }
    }

    export type PokemonSpecies = {
        flavor_text_entries : {
            flavor_text: string
            langage: RedirectionUrl
            version: RedirectionUrl
        }[]
    }
    
    export type PokemonData = {
        id: number
        name: string
        base_experience: number
        height: number // in decimeters
        weight: number //in hectograms
        species: RedirectionUrl
        types: PokemonType[]
        sprites: PokemonSprite,
    }

    export type TypeRelations = {
        no_damage_to: RedirectionUrl[]
        half_damage_to: RedirectionUrl[]
        double_damage_to: RedirectionUrl[]
        no_damage_from: RedirectionUrl[]
        half_damage_from: RedirectionUrl[]
        double_damage_from: RedirectionUrl[]
    }

    export type TypeEffectiveness = {
        name: string
        damage_relations: TypeRelations
    }

    export type PokemonInformation = {
        pokemonData: PokemonData
        pokemonSpecies: PokemonSpecies
    }

    export type SearchPokemonProps = {
        searchCategories: string[],
        types: string[]
    }

    export type RedirectionUrl = {
        name: string
        url: string
    }
    
     export type SearchPokemonState = {
        categorySelected: string,
        valueSearched: string,
        pokemonInformation?: PokemonInformation
        loading: boolean
        error?: number
    }
}

declare namespace PokemonReducerTypes {
    type Action =
    | { type: 'success', results: PokemonInformation}
    | { type: 'failure', error: number };
}
