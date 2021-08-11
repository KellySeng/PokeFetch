import * as React from "react"
import {Table, ProgressBar} from "react-bootstrap"

type DisplayStatsProps = {
    stats: PokemonTypings.PokemonBaseStats[]
}

export default class DisplayStats extends React.Component<DisplayStatsProps> {

    constructor(props : DisplayStatsProps) {
        super(props)
    }

    getPokemonStatRankByValue(value: number) {
        if(value < 30) return "rank-1"
        if(value >= 30 && value < 60) return "rank-2"
        if(value >= 60 && value < 90) return "rank-3"
        if(value >= 90 && value < 120) return "rank-4"
        if(value >= 120 && value < 150) return "rank-5"
        else return "rank-6"
    }

    render() {
        const stats = this.props.stats
        return (
            <div>
                <h2 className="title">Base Stats</h2>
                <Table responsive size="sm">
                    <tbody>
                        {stats.map( item => {
                            return (
                            <tr>
                                <td className="stat-name">{item.stat.name.replace('-', ' ')}</td>
                                <td className="stat-value">{item.base_stat}</td>
                                <td className="stat-bar"><ProgressBar variant={this.getPokemonStatRankByValue(item.base_stat)} max={255} now={item.base_stat}/></td>
                            </tr>
                        )})}   
                         <tr>
                            <td className="stat-name">Total</td>
                            <td className="stat-value">{stats.map(item => item.base_stat).reduce(function(a,b) { return a + b })}</td>
                            <td className="stat-bar"></td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        )
    }
}