import * as React from 'react'
import {useReducer} from 'react'
import { InputGroup, FormControl, DropdownButton, Dropdown, Button, Spinner, Col, Row, Container, Media } from 'react-bootstrap'
import fetchPokemonData from '../actions/fetchPokemonData'
import  DisplaySprites from './DisplaySprites'

type SearchPokemonProps = {
    searchCategories: string[]
}

type SearchPokemonState = {
    categorySelected: string,
    valueSearched: string,
}

type Action<T> =
| { type: 'empty' }
| { type: 'loading' }
| { type: 'success', results: T }
| { type: 'failure', error: number };

type State<T> =
| { status: 'empty' }
| { status: 'loading' }
| { status: 'error', error: number }
| { status: 'success', data: T }


function reducer<S>(state: State<S>, action: Action<S>): State<S> {
    switch (action.type) {
        case 'loading': return { status: 'loading' };
        case 'success': return { status: 'success', data: action.results };
        case 'failure': return { status: 'error', error: action.error };
        case 'empty': return { status: 'empty' }
    }
}

export default function SearchPokemon ({searchCategories}: SearchPokemonProps) {
    const [searchPokemonState, setSearchPokemonState] = React.useState<SearchPokemonState>({
        categorySelected: searchCategories[0],
        valueSearched: '',
    })

    const[dispatchState, dispatch] = useReducer<React.Reducer<State<PokemonTypings.PokemonData>, Action<PokemonTypings.PokemonData>>>(reducer, {status : 'empty'})
    const { categorySelected, valueSearched } = searchPokemonState
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
                        setSearchPokemonState({...searchPokemonState})
                        dispatch({ type: 'loading'});
                        fetchPokemonData<PokemonTypings.PokemonData>(valueSearched.toLowerCase()).then(response => {
                            dispatch({ type: 'success', results : response });
                        })
                    }}>
                    Search
                </Button>
            </InputGroup.Append>     
        </InputGroup>

        {dispatchState.status == 'loading' && <Spinner animation="border"/>}
        {dispatchState.status == 'success' && dispatchState.data &&
        <Container>
            <Row>
                <Col md="auto">{dispatchState.data.id}</Col>
                <Col>{dispatchState.data.name}</Col>
                {dispatchState.data.types.map(item => <Col>{item.type.name}</Col>)}
            </Row>
            <DisplaySprites sprites={dispatchState.data.sprites}/>
        </Container>}
    </div>
}