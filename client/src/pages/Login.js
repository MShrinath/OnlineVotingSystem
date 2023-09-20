import { useState } from "react";
import "../css/Login.css"

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function Login_User(event) {
        event.preventDefault();

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