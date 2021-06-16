import * as React from "react"
import { Nav, Tab, Col, Row, Container, Tabs } from 'react-bootstrap'

type DisplayStatsProps = {
    stats: PokemonTypings.PokemonBaseStats[]
}

export default class DisplayStats extends React.Component<DisplayStatsProps> {

    constructor(props : DisplayStatsProps) {
        super(props)
    }

    render() {
        return (
            <div>
                <h2 className="title">Stats</h2>
            </div>
        )
    }
}
