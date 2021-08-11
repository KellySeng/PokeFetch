import * as React from "react"
import { Media, Card, Badge, ListGroup, Container, Row, Col } from 'react-bootstrap'
import DisplaySprites from './DisplaySprites'
import DisplayTypes from './DisplayTypes'
import DisplayTypeEffectiveness from './DisplayTypeEffectiveness'
import DisplayStats from './DisplayStats'

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
        const {pokemon, types} = this.props
        const { pokemonData, pokemonSpecies } = pokemon
        const pokemonType = pokemonData.types.map(item => item.type.name)
        const pokemonTypeEffectiveness = this.props.typeEffectiveness.filter(typeEffectiveness => pokemonType.includes(typeEffectiveness.name))
        console.log(pokemonSpecies)
        return (
            <Container>
                <Row>
                    <Col xs={12} md={12} lg={3}>
                        <Card>
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
                    </Col>
                    <Col xs={12} md={12} lg={9}>
                    <DisplayStats stats={pokemonData.stats}/>
                    <DisplayTypeEffectiveness typeRelations={pokemonTypeEffectiveness} types={types}/>
                    </Col>
                    </Row>
            </Container>
        )
    }
}