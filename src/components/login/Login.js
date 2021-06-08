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
            console.log(result.access_token)
            if(result.access_token){
                localStorage.setItem('user-info',JSON.stringify(result));
                setEmail('');
                setPassword('');
                history.push('/modeltype');
            }else{
                alert('User dose not exists !!!');
            }
        }else{
            alert('Please provide email and password')
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

                <div className="input_container">
                    <i class="fa fa-envelope" style={{fontSize:'36px'}}></i>
                    <input
                    type="text"
                    placeholder="Email..."
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    />
                </div>

                <div className="input_container">
                    <i class="fa fa-lock" style={{fontSize:'42px'}}></i>
                    <input
                    type="password"
                    placeholder="Password..."
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    />

                </div>

                <div className="input_container">
                    <div></div>
                    <Button variant="primary" onClick={login}>Login</Button>
                </div>
                

                

                

            </div>
            
        </div>
    )
}

export default Login
