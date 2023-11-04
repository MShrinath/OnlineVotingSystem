import { useState } from "react";
import "../css/Register.css"
import axios from "axios";

function Register() {
    const [first_name, setFirst_name] = useState("");
    const [last_name, setLast_name] = useState("");
    const [dob, setDob] = useState(Date);
    const [aadhaar_number, setAadhaar_number] = useState(null);
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // async function Register_User(event) {
    //     event.preventDefault();

    //     function over18(birthday) {
    //         var optimizedBirthday = birthday.replace(/-/g, "/");
    //         var myBirthday = new Date(optimizedBirthday);
    //         var currentDate = new Date().toJSON().slice(0, 10) + ' 01:00:00';
    //         var myAge = ((Date.now(currentDate) - myBirthday) / (31557600000));
    //         if (myAge < 18)
    //             return false;
    //         else
    //             return true;

    //     }
    //     if (over18(dob) === false) 
    //         alert("You are under age")
    //     console.log(gender)
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/user/register", {
                first_name: first_name,
                last_name: last_name,
                dob: dob,
                aadhaar_number:aadhaar_number,
                gender: gender,
                email: email,
                username: username,
                password: password,
                vote:-1,
            })
        } catch (error) {
            console.log("Error in Sending Data", error)
        }
        alert("Voter registered successfully!")
    };

    return (
        <div className="register-container">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
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
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    placeholder="Date of Birth"
                />
                <input
                    type="text"
                    value={aadhaar_number}
                    onChange={(e) => setAadhaar_number(e.target.value)}
                    placeholder="Aadhaar Number"
                />
                <select value={gender} onChange={(e) => setGender(e.target.value)}>
                    <option defaultValue="" hidden>Select an Option</option> 
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
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
                <input type="submit" value="Register" />
            </form>
        </div>
    );
}

export default Register;