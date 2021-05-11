import * as React from 'react'
import {useReducer} from 'react'
import { InputGroup, FormControl, DropdownButton, Dropdown, Button, Spinner, Col, Row, Container, Media } from 'react-bootstrap'
import {fetchPokemonData, fetchTypesData} from '../actions/fetchPokemonData'
import reducer from '../reducer/Reducer'
import DisplayPokemon from './DisplayPokemon'

export default function SearchPokemon ({searchCategories, types}: PokemonTypings.SearchPokemonProps): JSX.Element {
    const [searchPokemonState, setSearchPokemonState] = React.useState<PokemonTypings.SearchPokemonState>({
        categorySelected: searchCategories[0],
        valueSearched: '',
        loading: false
    })

    const [typeEffectiveness, setTypeEffectivenessState] = React.useState<PokemonTypings.TypeEffectiveness[]>([])
    React.useEffect(() => {
        fetchTypesData(types).then(response => setTypeEffectivenessState(response))
    },[types])

    const[state, dispatch] = useReducer(reducer, searchPokemonState)
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
                        fetchPokemonData(valueSearched.toLowerCase()).then(response => {
                            dispatch({ type: 'success', results : response });
                        })
                    }}>
                    Search
                </Button>
            </InputGroup.Append>     
        </InputGroup>
            
            
        {state.pokemonInformation && <DisplayPokemon pokemon={state.pokemonInformation} typeEffectiveness={typeEffectiveness} types={types}/>}
    </div>
}

