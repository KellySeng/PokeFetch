import * as React from "react"
import { Media, Card, Badge , ListGroup} from 'react-bootstrap'
import  DisplaySprites from './DisplaySprites'
import  DisplayTypes from './DisplayTypes'
import  DisplayTypeEffectiveness from './DisplayTypeEffectiveness'

type DisplayPokemonProps = {
    pokemon: PokemonTypings.PokemonInformation
}

export default class DisplayPokemon extends React.Component<DisplayPokemonProps> {

    constructor(props : DisplayPokemonProps) {
        super(props)
    }

    render() {
        const {pokemonData, pokemonSpecies, typeEffectiveness} = this.props.pokemon
        return (
            <Media>
                <Card className="mr-3" style={{ width: '18rem' }}>
                    <Card.Img variant="top"  src={pokemonData.sprites.other["official-artwork"].front_default} />
                    <Card.Body>
                        <Card.Title className="title"> <Badge variant="primary">#{pokemonData.id}</Badge> {pokemonData.name} </Card.Title>
                        <DisplayTypes types={pokemonData.types.map(item => ({name: item.type.name}))}/>
                        <ListGroup>
                            <ListGroup.Item>Height: {pokemonData.height/10} m</ListGroup.Item>
                            <ListGroup.Item>Weight: {pokemonData.weight/10} kg</ListGroup.Item>
                            <ListGroup.Item>Base experience: {pokemonData.base_experience}</ListGroup.Item>
                        </ListGroup>
                        <Card.Text>
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Media.Body>
                <DisplayTypeEffectiveness typeRelations={typeEffectiveness}/>
                <DisplaySprites sprites={pokemonData.sprites}/>
            </Media.Body>
            </Media>
        )
    }
}