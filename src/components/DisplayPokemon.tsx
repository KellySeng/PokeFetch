import * as React from "react"
import { Media, Card, Badge, ListGroup } from 'react-bootstrap'
import DisplaySprites from './DisplaySprites'
import DisplayTypes from './DisplayTypes'
import DisplayTypeEffectiveness from './DisplayTypeEffectiveness'

type DisplayPokemonProps = {
    pokemon: PokemonTypings.PokemonInformation
    typeEffectiveness: PokemonTypings.TypeEffectiveness[]
    types: string[]
}

export default class DisplayPokemon extends React.Component<DisplayPokemonProps> {

    constructor(props: DisplayPokemonProps) {
        super(props)
    }

    render() {
        console.log("Something changed")
        const {pokemon, typeEffectiveness, types} = this.props
        const { pokemonData, pokemonSpecies } = pokemon
        const pokemonType = pokemonData.types.map(item => item.type.name)
        const pokemonTypeEffectiveness = this.props.typeEffectiveness.filter(typeEffectiveness => pokemonType.includes(typeEffectiveness.name))
        return (
            <Media>
                <Card className="mr-3" style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={pokemonData.sprites.other["official-artwork"].front_default} />
                    <Card.Body>
                        <Card.Title className="title"> <Badge variant="primary">#{pokemonData.id}</Badge> {pokemonData.name} </Card.Title>
                        <DisplayTypes types={pokemonData.types.map(item => ({ name: item.type.name }))} />
                        <ListGroup>
                            <ListGroup.Item>Height: {pokemonData.height / 10} m</ListGroup.Item>
                            <ListGroup.Item>Weight: {pokemonData.weight / 10} kg</ListGroup.Item>
                            <ListGroup.Item>Base experience: {pokemonData.base_experience}</ListGroup.Item>
                        </ListGroup>
                        <Card.Text>
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Media.Body>
                    <DisplayTypeEffectiveness typeRelations={pokemonTypeEffectiveness} types={types}/>
                    <DisplaySprites sprites={pokemonData.sprites} />
                </Media.Body>
            </Media>
        )
    }
}