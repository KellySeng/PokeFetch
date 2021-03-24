import * as React from 'react'
import { InputGroup, FormControl, DropdownButton, Dropdown, Button } from 'react-bootstrap'
import fetchPokemonData from '../actions/fetchPokemonData'

type SearchPokemonProps = {
    searchCategories: string[]
}



type SearchPokemonState = {
    categorySelected: string,
    valueSearched: string,
    pokemonData?: any
}

export default function SearchPokemon ({searchCategories}: SearchPokemonProps) {
    const [searchPokemonState, setSearchPokemonState] = React.useState<SearchPokemonState>({
        categorySelected: searchCategories[0],
        valueSearched: ''
    })

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
                <Button type="submit" onClick={() => setSearchPokemonState({...searchPokemonState, pokemonData: fetchPokemonData(valueSearched)}) }>Search</Button>
            </InputGroup.Append>
  </InputGroup>
    </div>
}