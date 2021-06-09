import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap';

const NotFound = () => {
    return (
        <div style={no_div_style}>
            <h1 style={{marginBottom: '25px'}}>No Page Found</h1>
            <Link to="/">
                <Button variant="info">
                    Back to Home
                </Button>
            </Link>
        </div>
    )
}

const no_div_style = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '100vh',
}

export default NotFound
