import * as React from 'react'
import SearchPokemon from './SearchPokemon'
import { Container, Row } from 'react-bootstrap'

export default function DisplayMainPage (): JSX.Element {
    const types = ['bug', 'dark', 'dragon', 'electric', 'fairy', 'fire', 'fighting', 'flying', 'ghost', 'grass', 'ground', 'ice', 'normal', 'poison', 'psychic', 'rock', 'steel', 'water']

    return <Container>
            <Row className="justify-content-md-center"><img src="pokemonCompendiumTitle.png"/></Row>
            <SearchPokemon searchCategories={['Id / Name']} types={types}/>
        </Container>
}