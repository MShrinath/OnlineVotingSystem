import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Login.css"

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    async function Login_User(event) {
        event.preventDefault();
        const response = await axios.post('http://localhost:5000/api/user/login', {
            username: username,
            password: password
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });

        const data = response.data

        if (data.user) {

            alert("logged in");
            navigate('/vote');
        }
        else {
            alert("invalid credentials");
        }

        console.log(data);
    }

return (
    <div>
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
);
}

export default Login;