import * as React from "react"
import { Table } from 'react-bootstrap'
import DisplayTypes from "./DisplayTypes"


type DisplayTypeRelationsProps = {
    typeRelations: PokemonTypings.TypeEffectiveness[]
}

type DisplayTypeCoefficentState = {
    defaultTypesCoefficients: Map<string, number>,
    currentTypesCoefficients: Map<string, number>,
}

export default function DisplayTypeEffectiveness ({typeRelations}: DisplayTypeRelationsProps) : JSX.Element {
    const types = ['bug', 'dark', 'dragon', 'electric', 'fairy', 'fire', 'fighting', 'flying', 'ghost', 'grass', 'ground', 'ice', 'normal', 'poison', 'psychic', 'rock', 'steel', 'water']
    const resistanceLabels = [
        {name: "Neutral", condition: (value: number) => value == 1 },
        {name: "Weak to", condition: (value: number) => value > 1 },
        {name: "Immune to", condition: (value: number) => value == 0 },
        {name: "Resistant to", condition: (value: number) => value < 1 && value > 0 }
    ]

    const [typeCoefficientsState, setTypeCoefficientState] = React.useState<DisplayTypeCoefficentState>({
        defaultTypesCoefficients: new Map<string, number>(types.map(type => [type, 1])),
        currentTypesCoefficients: new Map<string, number>(types.map(type => [type, 1]))
    })

    const applyTypeResistanceCoefficients = (types: PokemonTypings.RedirectionUrl[], coefficient: number) => {
        types.forEach(item => typeCoefficientsState.currentTypesCoefficients.set(item.name, (typeCoefficientsState.currentTypesCoefficients.get(item.name) as number) * coefficient))
    }

    React.useEffect(() => {
        setTypeCoefficientState({...typeCoefficientsState, currentTypesCoefficients : typeCoefficientsState.defaultTypesCoefficients})
        typeRelations.forEach(relation => {
            const { double_damage_from, half_damage_from, no_damage_from } = relation.damage_relations
            applyTypeResistanceCoefficients(double_damage_from, 2.0)
            applyTypeResistanceCoefficients(half_damage_from, 0.5)
            applyTypeResistanceCoefficients(no_damage_from, 0)
        })
        setTypeCoefficientState({...typeCoefficientsState, currentTypesCoefficients : typeCoefficientsState.currentTypesCoefficients})
    }, [typeRelations])

      
    return <div>
                <h2 className="title">Type Effectiveness</h2>
                <Table hover bordered>
                    <thead>
                        <tr>
                            <th>Resistances</th>
                            <th>Types</th>
                        </tr>
                    </thead>
                    <tbody>
                        {resistanceLabels.map(label => {
                            return (
                                <tr>
                                    <td>{label.name}</td>
                                    <td><DisplayTypes types={
                                            Array.from(typeCoefficientsState.currentTypesCoefficients.entries())
                                            .filter(type => label.condition(type[1]))
                                            .map(type => ({name : type[0], coefficient: type[1]}))} /></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>


}
