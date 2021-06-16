import * as React from "react"
import { Badge } from 'react-bootstrap'

type DisplayTypesProps = {
    types: {
        name: string,
        coefficient?: number
    } []
}

export default class DisplayTypes extends React.Component<DisplayTypesProps> {

    constructor(props: DisplayTypesProps) {
        super(props)
    }

    render() {
        const { types } = this.props
        return (
            <div className="mb-2">
                {types.length == 0 && <Badge className="ml-1" variant="secondary" pill>NONE</Badge>}
                {types.map(type => 
                <Badge className="mr-2" pill variant={type.name}>{type.name.toUpperCase()}
                    {type.coefficient != undefined && <Badge className="ml-1" variant="light">X {type.coefficient}</Badge>}
                </Badge>)}
            </div>
        )
    }
}
