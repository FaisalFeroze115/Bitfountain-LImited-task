import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

const Protected = ({Component}) => {

    let history = useHistory();

    useEffect(()=>{
        if(!localStorage.getItem('user-info')){
            history.push('/')
        }
    },[])


    return (
        <div>
            <Component/>
        </div>
    )
}

export default Protected
