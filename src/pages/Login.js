import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { setUserSession } from "../utils/common";
import axios from 'axios';

const Login = props => {
    const history = useNavigate();
    const username = useFormInput('');
    const password = useFormInput('');
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);

    const handleLogin = () => {
        setError(null);
        setLoading(true);
        axios.post('http://localhost:4000/users/signin', { username: username.value, password: password.value }).then(response => {
            setLoading(false);
            setUserSession(response.data.token, response.data.user);
            history('/dashboard');
        }).catch(error => {
            setLoading(false);
            if (error.response.status === 401) setError(error.response.data.user);
            else setError("Something went wrong. Please try again later.");
        });
    }

    return (
        <div>
            Login<br /><br />
            <div>
                Username<br />
                <input type="text" {...username} autoComplete="new-password"/>
            </div>
            <div style={{ marginTop: 10}}>
                Password<br/>
                <input type="password" {...password} autoComplete="new-password"/>
            </div>
            {error && <>< small style={{ color: 'red' }}></small><br/></>}<br/>
            <input type="button" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading}/> <br />
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
        onchange: handleChange
    }
}

export default Login;