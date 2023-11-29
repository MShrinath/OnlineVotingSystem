import { useState } from "react";
import "../css/Register.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
    const [first_name, setFirst_name] = useState("");
    const [last_name, setLast_name] = useState("");
    const [dob, setDob] = useState("");
    const [aadhaar_number, setAadhaar_number] = useState("");
    const [voter_id, setVoter_id] = useState("");
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (
            !first_name ||
            !last_name ||
            !dob ||
            !aadhaar_number ||
            !voter_id ||
            !gender ||
            !email ||
            !username ||
            !password
        ) {
            alert("All fields are required");
            return;
        }

        // Age check
        const currentDate = new Date();
        const userDOB = new Date(dob);
        const age = currentDate.getFullYear() - userDOB.getFullYear();
        if (age < 18) {
            alert("You must be at least 18 years old to register");
            return;
        }

        // Username must be more than 3 characters
        if (username.length < 3) {
            alert("Username must be more than 3 characters");
            return;
        }

        // Password validation (at least 6 characters for example)
        if (password.length < 6) {
            alert("Password must be at least 6 characters");
            return;
        }

        // Aadhaar number should be exactly 12 numbers
        if (!/^\d{12}$/.test(aadhaar_number)) {
            alert("Aadhaar number should be exactly 12 numbers");
            return;
        }

        // Voter ID should be exactly 10 numbers
        if (!/^\d{10}$/.test(voter_id)) {
            alert("Voter ID should be exactly 10 numbers");
            return;
        }

        try {
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/user/register`, {
                first_name,
                last_name,
                dob,
                aadhaar_number,
                voter_id,
                gender,
                email,
                username,
                password,
                vote: "NONE",
            });
            alert("Voter registered successfully!");
            navigate('/login');
        } catch (error) {
            console.log("Error in Sending Data", error);
            alert("Registration failed. Please try again.");
        }
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
                <input
                    type="text"
                    value={voter_id}
                    onChange={(e) => setVoter_id(e.target.value)}
                    placeholder="Voter Id"
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