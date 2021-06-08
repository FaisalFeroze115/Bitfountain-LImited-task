import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Header from './header/Header'

const Protected = ({Component}) => {

    let history = useHistory();

    useEffect(()=>{
        if(!localStorage.getItem('user-info')){
            history.push('/');
        }
    },[])


    return (
        <div>
            <Header/>
            {
                localStorage.getItem('user-info')  ?
                <Component/> : null
            }
            
        </div>
    )
}

export default Protected
