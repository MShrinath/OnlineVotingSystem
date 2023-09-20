import { useState } from "react";
import "../css/Register.css"

function Register() {
    const [first_name, setFirst_name] = useState("");
    const [last_name, setLast_name] = useState("");
    const [dob, setDob] = useState(Date);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function Register_User(event) {
        event.preventDefault();

        function over18(birthday) {
            var optimizedBirthday = birthday.replace(/-/g, "/");
            var myBirthday = new Date(optimizedBirthday);
            var currentDate = new Date().toJSON().slice(0, 10) + ' 01:00:00';
            var myAge = ((Date.now(currentDate) - myBirthday) / (31557600000));
            if (myAge < 18)
                return false;
            else
                return true;

        }
        if(over18(dob) === false){
            alert("You are under age")
        }
    }

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={Register_User}>
                <input
                    type="text"
                    value={first_name}
                    onChange={(e) => setFirst_name(e.target.value)}
                    placeholder="First Name"
                />
                <input
                    type="text"
                    value={last_name}
                    onChange={(e) => setLast_name(e.target.value)}
                    placeholder="Last Name"
                />
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
                <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    placeholder="Date of Birth"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <input type="submit" value="Register" />
            </form>
        </div>
    );
}

export default Register;