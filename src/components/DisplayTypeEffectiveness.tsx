import { Table } from 'react-bootstrap'
import DisplayTypes from "./DisplayTypes"

type DisplayTypeRelationsProps = {
    typeRelations: PokemonTypings.TypeEffectiveness[],
    types: string[]
}

export default function DisplayTypeEffectiveness ({typeRelations, types}: DisplayTypeRelationsProps) : JSX.Element {
    const resistanceLabels = [
        {name: "Neutral", condition: (value: number) => value == 1 },
        {name: "Weak to", condition: (value: number) => value > 1 },
        {name: "Immune to", condition: (value: number) => value == 0 },
        {name: "Resistant to", condition: (value: number) => value < 1 && value > 0 }
    ]

    const applyTypeResistanceCoefficients = (types: PokemonTypings.RedirectionUrl[], coefficient: number) => {
        types.forEach(item => typeCoefficients.set(item.name, (typeCoefficients.get(item.name) as number) * coefficient))
    }

    const typeCoefficients = new Map<string, number>(types.map(type => [type, 1]))
    typeRelations.forEach(relation => {
        const { double_damage_from, half_damage_from, no_damage_from } = relation.damage_relations
        applyTypeResistanceCoefficients(double_damage_from, 2.0)
        applyTypeResistanceCoefficients(half_damage_from, 0.5)
        applyTypeResistanceCoefficients(no_damage_from, 0)
    })

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
                                    <td>
                                        <DisplayTypes types={
                                            Array.from(typeCoefficients.entries())
                                            .filter(type => label.condition(type[1]))
                                            .map(type => ({name : type[0], coefficient: type[1]}))} />
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
}
