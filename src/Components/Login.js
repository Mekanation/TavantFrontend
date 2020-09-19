import React, { useState } from 'react';
import axios from 'axios';
import { setUserSession } from '../Utils/Common';

function Login(props){
    const [loading, setLoading] = useState(false);
    const email = useFormInput('');
    const password = useFormInput('');
    const [error, setError] = useState(null);


    // {email: email.value, password: password.value}

    const handleLogin = () => {
        setError(null);
        setLoading(true);
        const params = new URLSearchParams();
        params.append('email',email.value);
        params.append('password',password.value)
        
        axios.post('http://18.207.205.219:8080/TavantDemo-1/api/v1/user/login', params, {headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
        }}).then(response => {
            setLoading(false);
            var result = response.headers.authorization.split(" ");
            var token = result[1];
            console.log(token);
            setUserSession(token);
            props.history.push('/loanapplication');
            
        }).catch(error => {
            setLoading(false);
            
            if(error.response.status === 401){
                console.log(error.response.status);
                setError("Login failed, check your email and password, then try again");
            } 
            else setError("Something went wrong, try again later");
        });
    }

    return(
        <div>
            Login <br/>
            <div>
                Email <br/>
                <input type="email" {...email} />
            </div>
            <div style={{marginTop: 10}} >
                Password <br/>
                <input type="password" {...password} />
            </div>
            <input type="button" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading} /> <br/>


        </div>
    );
}

const useFormInput = initialValue => {
    const [value, setValue] = useState(initialValue);

    const handleChange = e => {
        setValue(e.target.value);
    }
    return {
        value,
        onChange: handleChange
    }
}

export default Login;