import React, { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import cookie from 'cookie';
import axios from "axios";

function Admin() {
    const [allDetails, setAllDetails] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {

        const cookies = cookie.parse(document.cookie);
        const token = cookies.sessionToken;

        if (token) {
            const decodedToken = jwtDecode(token);
            if (decodedToken && decodedToken._id) {
                const userId = decodedToken._id;

                axios.get(`http://localhost:5000/api/user/${userId}`)
                    .then(response => {
                        const data = response.data;
                        setIsAdmin(data.admin);
                    })
                    .catch(error => {
                        console.error('Error fetching user data:', error);
                    });
            }
        }

        const fetchAllData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/user/');
                setAllDetails(response.data)
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchAllData();
    }, [])

    console.log(isAdmin);

    return (
        <div>
            <center>
                {isAdmin ? (
                    <div>
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
                ) : (
                    <h1>Admin Access Required</h1>
                )}
            </center>
        </div>
    );


    return (
        <div className="ok">
            <h1>{isAdmin}</h1>

        </div>
    );
}

export default Admin;