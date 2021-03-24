import * as React from 'react'
import SearchPokemon from './SearchPokemon'

export default class DisplayMainPage extends React.Component {
    render() {
        return <div>
            <img src="pokemonCompendiumTitle.png"/>
            <SearchPokemon searchCategories={['Name','Id']}/>
        </div>
    }
}