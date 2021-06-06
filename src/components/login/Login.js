import React, {useState, useEffect} from 'react'
import './login.css'
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom'
 
const Login = () => {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = async () =>{
        if(email && password){
            let info = {email, password};
            const res = await fetch('http://163.47.115.230:30000/api/login',{
                method: "POST",
                body: JSON.stringify(info),
                headers: {
                    'Content-Type':'Application/json',
                    'Accept': 'Application/json'
                }
            });
            const result = await res.json();
            localStorage.setItem('user-info',JSON.stringify(result));
            //console.log(result);
            //history.push('/add');
            setEmail('');
            setPassword('');
            history.push('/modeltype');


        }else{
            alert('Please provide emailand password')
        }

    }

    useEffect(()=>{
        if(localStorage.getItem('user-info')){
            history.push('/modeltype');
        }
    },[])

    return (
        <div className="login">
            <div className="login__container">
                <input
                 type="text"
                 placeholder="email..."
                 value={email}
                 onChange={(e)=>setEmail(e.target.value)}
                />

                <input
                 type="password"
                 placeholder="password..."
                 value={password}
                 onChange={(e)=>setPassword(e.target.value)}
                />

                <Button variant="primary" onClick={login}>Login</Button>


            </div>
            
        </div>
    )
}

export default Login
