import React, { useState, useEffect } from "react";
import axios from "axios";

function Admin() {
    const [allDetails, setAllDetails] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/user/');
                setAllDetails(response.data)
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchData();
    }, [])


    return (
        <div className="ok">
            <ul>
                {allDetails.map((all) => (
                    <li key={all._id}>
                        <h1>{all.first_name}</h1>
                        <h1>{all.last_name}</h1>
                        <h1>{all.dob}</h1>
                        <h1>{all.gender}</h1>
                        <h1>{all.email}</h1>
                        <h1>{all.username}</h1>
                        <h1>{all.vote}</h1>
                        <h1>{all.admin}</h1>
                    </li>
                ))}
            </ul>

        </div>
    );
}

export default Admin;