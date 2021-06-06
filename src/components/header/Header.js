import React from 'react'
import './header.css'
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom'


const Header = () => {
    const history = useHistory();
    const logout = () =>{
        localStorage.clear();
        history.push('/');
    }
    return (
        <div className="Header">
            <div className="Header__logo">
                Assigned Task
            </div>

            <div>
                {
                    localStorage.getItem('user-info') ?
                    <div>
                        {/* <span>{localStorage.getItem('user-info')}</span> */}
                        <Button variant="info" onClick={logout}>Logout</Button>
                    </div>
                    :null
                }
            </div>
        </div>
    )
}

export default Header
