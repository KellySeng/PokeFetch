import { Spinner } from 'react-bootstrap'

export const LoadingSpinner = () => { 
    return (
        <Spinner className="align-center" animation="border" role="status">
            <span className="sr-only">Loading...</span>
        </Spinner>
    )
}