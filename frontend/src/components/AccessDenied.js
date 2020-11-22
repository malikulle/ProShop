import React from 'react'
import {Alert} from "react-bootstrap"

const AccessDenied = props => {
    return (
        <Alert variant="danger">
            You have no permission to access this page
        </Alert>
    )
}


export default AccessDenied
