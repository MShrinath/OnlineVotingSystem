import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import jwtDecode from 'jwt-decode';
import axios from "axios";
import "../css/Login.css"

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [authenticated, setAuthenticated] = useState(false);

    const navigate = useNavigate();

    async function Login_User(event) {
        event.preventDefault();
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/user/login`, {
            username: username,
            password: password
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        const data = response.data

        if (data.status === 'ok') {
            const sessionToken = data.sessionToken;
            localStorage.setItem('sessionToken', sessionToken);
            alert("logged in");
            navigate('/vote');
        } else {
            alert("invalid credentials");
        }
    }

    const deleteLocalStorageItem = (key) => {
        localStorage.removeItem(key);
    };

    useEffect(() => {
        const token = localStorage.getItem('sessionToken');

        if (token) {
            const decodedToken = jwtDecode(token);
            if (decodedToken && decodedToken._id) {
                const userId = decodedToken._id;

                axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/user/${userId}`)
                    .then(response => {
                        setAuthenticated(true);
                    })
                    .catch(error => {
                        console.error('Error fetching user data:', error);
                    });
            }
        }
    }, []);

    return (
        <div>
            {!authenticated ? (
                <div className="login-container">
                    <h1>Login</h1>
                    <form onSubmit={Login_User}>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                        />
                        <input type="submit" value="Login" />
                    </form>
                </div>
            ) : (
                <center className='loggedin-container'>
                    <h1>You are already logged in</h1>
                    <button onClick={() => {
                        deleteLocalStorageItem("sessionToken");
                        setAuthenticated(false);
                    }}>Logout</button>
                </center>
            )}
        </div>
    );
}

export default Login;