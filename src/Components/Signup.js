import React, { useState } from 'react';
import axios from 'axios';

function Signup(props){
    const [loading, setLoading] = useState(false);
    const email = useFormInput('');
    const password = useFormInput('');
    const firstName = useFormInput('');
    const lastName = useFormInput('');
    const [error, setError] = useState(null);


    var config = {
        method: 'post',
        url: 'http://18.207.205.219:8080/TavantDemo-1/api/v1/user/createuser',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : JSON.stringify({firstname: firstName.value, lastname: lastName.value, email: email.value, password: password.value})
      };


    const handleSignup = () => {
        setError(null);
        setLoading(true);
       
        axios(config)
        .then(response => {
            setLoading(false);
            console.log(response);
            props.history.push('/login');
        }).catch(error => {
            setLoading(false);
            
            if(error.response.status === 401){
                console.log(error.response.status);
                setError("Signup failed, check your email and password, then try again");
            } 
            else setError("Something went wrong, try again later");
        });
    }

    return(
        <div>
            Signup <br/>
            <div style={{marginTop: 10}}>
                First Name <br/>
                <input type="text" {...firstName} />
            </div>
            <div style={{marginTop: 10}}>
                Last Name <br/>
                <input type="text" {...lastName} />
            </div>

            <div style={{marginTop: 10}}>
                Email <br/>
                <input type="email" {...email} />
            </div>
            <div style={{marginTop: 10}} >
                Password <br/>
                <input type="password" {...password} />
            </div>
            <input type="button" value={loading ? 'Loading...' : 'Signup'} onClick={handleSignup} disabled={loading} /> <br/>


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

export default Signup;