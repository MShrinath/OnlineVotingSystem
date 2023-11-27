import React, { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import cookie from 'cookie';
import axios from "axios";

import VoterList from "./VoterList";
import P1 from "../images/Party1.png";
import P2 from "../images/Party2.png";
import P3 from "../images/Party3.png";
import NV from "../images/NOTA.png";

function Vote() {
    const [userData, setUserData] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);
    const [vote,setVote] = useState("");

    const votersData = [
        {
            PartySymbol: NV,
            Contender: "NOTA",
            PartyName: "NOTA"
        },
        {
            PartySymbol: P1,
            Contender: "PAWAN KALYAN",
            PartyName: "JANASENA",
        },
        {
            PartySymbol: P2,
            Contender: "CHANDRABABU NAIDU",
            PartyName: "TDP"
        },
        {
            PartySymbol: P3,
            Contender: "JAGAN MOHAN REDDY",
            PartyName: "YCP"
        }
    ];

    async function onSubmitVote(e) {
        e.preventDefault();
        if(document.getElementById("Voter0").checked === true) {setVote("NOTA")};
        if(document.getElementById("Voter1").checked === true) {setVote("JSP")};
        if(document.getElementById("Voter2").checked === true) {setVote("TDP")};
        if(document.getElementById("Voter3").checked === true) {setVote("YCP")};
        try {
            await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/user/${userData._id}`,
                {
                    vote:vote
                });
        }
        catch (err) {
            console.error("Error updating item;", err)
        }
        document.getElementById("Voter0").checked = false
        document.getElementById("Voter1").checked = false
        document.getElementById("Voter2").checked = false
        document.getElementById("Voter3").checked = false
        alert("Voted Thank you")
    }

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
                        setUserData(data);
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
            <center>
                {authenticated ? (
                    <div>
                        <h1>Welcome to vote {userData.first_name}</h1>
                        <form onSubmit={onSubmitVote}>
                            <VoterList voters={votersData} />
                            <input type="submit" />
                        </form>
                    </div>
                ) : (
                    <h1>Please login</h1>
                )}
            </center>
        </div>
    );
}

export default Vote;