import * as React from 'react'
import { InputGroup, FormControl, DropdownButton, Dropdown, Button, Spinner, Col, Row, Container } from 'react-bootstrap'
import fetchPokemonData from '../actions/fetchPokemonData'
import  DisplaySprites from './DisplaySprites'

type SearchPokemonProps = {
    searchCategories: string[]
}

type SearchPokemonState = {
    categorySelected: string,
    valueSearched: string,
    loading: boolean,
    pokemonData?: PokemonTypings.PokemonData
}

export default function SearchPokemon ({searchCategories}: SearchPokemonProps) {
    const [searchPokemonState, setSearchPokemonState] = React.useState<SearchPokemonState>({
        categorySelected: searchCategories[0],
        loading: false,
        valueSearched: '',
    })
    const { categorySelected, valueSearched, loading, pokemonData } = searchPokemonState
    return <div>
          <InputGroup className="mb-3">
            <DropdownButton as={InputGroup.Prepend} variant="secondary" title={categorySelected} id="input-group-dropdown-1">
               { searchCategories.map( category => 
                    <Dropdown.Item 
                        active={categorySelected === category} 
                        onClick={ () => setSearchPokemonState({...searchPokemonState, categorySelected: category, valueSearched: ''})}>
                            {category}
                    </Dropdown.Item>)}
            </DropdownButton>
            <FormControl 
                aria-describedby="basic-addon1" 
                placeholder="Search..." 
                value={valueSearched} 
                onChange={event => setSearchPokemonState({...searchPokemonState, valueSearched: event.target.value }) } />
            <InputGroup.Append>
                <Button 
                    type="submit" 
                    onClick={() => {
                        setSearchPokemonState({...searchPokemonState, loading: true})
                        fetchPokemonData(valueSearched).then( response => setSearchPokemonState({...searchPokemonState, loading: false, pokemonData: response}))
                    }}>
                    Search
                </Button>
            </InputGroup.Append>     
        </InputGroup>

        {loading && <Spinner animation="border"/>}
        {pokemonData && !loading && 
        <Container>
            <Row>
                <Col md="auto">{pokemonData.id}</Col>
                <Col>{pokemonData.name}</Col>
                {pokemonData.types.map( item => <Col>{item.type.name}</Col>)}
            </Row>

            <DisplaySprites sprites={pokemonData.sprites}/>
        </Container>}
    </div>
}