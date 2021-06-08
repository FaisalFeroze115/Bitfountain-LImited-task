import React from 'react'
import './header.css'
import { Button } from 'react-bootstrap';
import { useHistory, Link } from 'react-router-dom'


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
                        <Link to="/add" style={{color:'#fff', marginRight: '15px'}}>
                            Add New Device Model
                        </Link>
                        <Button variant="info" onClick={logout}>Logout</Button>
                    </div>
                    :null
                }
            </div>
        </div>
    )
}

export default Header
