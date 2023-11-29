import React, { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import cookie from 'cookie';
import axios from "axios";
import "../css/Admin.css"

function Admin() {
    const [allDetails, setAllDetails] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [voteStatistics, setVoteStatistics] = useState([]);

    useEffect(() => {

        const cookies = cookie.parse(document.cookie);
        const token = cookies.sessionToken;

        if (token) {
            const decodedToken = jwtDecode(token);
            if (decodedToken && decodedToken._id) {
                const userId = decodedToken._id;

                axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/user/${userId}`)
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
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/user`);
                setAllDetails(response.data)
            } catch (error) {
                console.log(error.message);
            }
        };

        const fetchVoteStatistics = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/user/voteStatistics`);
                setVoteStatistics(response.data);
            } catch (error) {
                console.log(error.message);
            }
        };

        fetchAllData();
        fetchVoteStatistics();
    }, [])

    const findSecondHighest = (data) => {
        const sortedData = [...data].sort((a, b) => b.count - a.count);

        if (sortedData.length >= 2) {
            return sortedData[1].vote;
        }

        return "No second-highest vote available";
    };

    const secondHighestVote = findSecondHighest(voteStatistics);

    return (
        <div>
            {isAdmin ? (
                <div className='admin-container'>
                    <center><h2>Vote Statistics</h2></center>
                    <table>
                        <thead>
                            <tr>
                                <th>Party</th>
                                <th>Count</th>
                            </tr>
                        </thead>
                        <tbody>
                            {voteStatistics.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.vote}</td>
                                    <td>{item.count}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <br />
                    <center style={{ backgroundColor: 'lightblue', padding: '10px' }}>
                            <thread>
                                <tr>
                                    <th>Winner</th>
                                    <th>{secondHighestVote}</th>
                                </tr>
                            </thread>
                    </center>
                    <br/>
                        <table>
                            <thead>
                                <tr>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Date of Birth</th>
                                    <th>Aadhaar Number</th>
                                    <th>Voter ID</th>
                                    <th>Gender</th>
                                    <th>Vote</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allDetails.map((all) => (
                                    <><tr key={all._id}>
                                        <td>{all.first_name}</td>
                                        <td>{all.last_name}</td>
                                        <td>{all.username}</td>
                                        <td>{all.email}</td>
                                        <td>{all.dob}</td>
                                        <td>{all.aadhaar_number}</td>
                                        <td>{all.voter_id}</td>
                                        <td>{all.gender}</td>
                                        <td>{all.vote}</td>
                                    </tr></>
                                ))}
                            </tbody>
                        </table>
                    </div>
            ) : (
                <center className="notadmin-container">
                    <h1>Admin Access Required</h1>
                </center>
            )}
        </div>
    );
}

export default Admin;