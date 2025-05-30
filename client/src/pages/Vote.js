import React, { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import axios from "axios";

import ContenderList from "./ContenderList";
import P1 from "../images/Party1.png";
import P2 from "../images/Party2.png";
import P3 from "../images/Party3.png";
import NV from "../images/NOTA.png";

function Vote() {
    const [userData, setUserData] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);
    const [vote,setVote] = useState("");

    const contenderData = [
        {
            PartySymbol: NV,
            Contender: "NOTA",
            PartyName: "NOTA"
        },
        {
            PartySymbol: P1,
            Contender: "RED",
            PartyName: "RED",
        },
        {
            PartySymbol: P2,
            Contender: "YELLOW",
            PartyName: "YELLOW"
        },
        {
            PartySymbol: P3,
            Contender: "GREEN",
            PartyName: "GREEN"
        }
    ];

    async function onSubmitVote(e) {
        e.preventDefault();
        if(document.getElementById("Contender0").checked === true) {setVote("NOTA")};
        if(document.getElementById("Contender1").checked === true) {setVote("RED")};
        if(document.getElementById("Contender2").checked === true) {setVote("YELLOW")};
        if(document.getElementById("Contender3").checked === true) {setVote("GREEN")};
        try {
            await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/user/${userData._id}`,
                {
                    vote:vote
                });
        }
        catch (err) {
            console.error("Error updating item;", err)
        }
        document.getElementById("Contender0").checked = false
        document.getElementById("Contender1").checked = false
        document.getElementById("Contender2").checked = false
        document.getElementById("Contender3").checked = false
        alert("Voted Thank you")
    }

    useEffect(() => {
        const token = localStorage.getItem('sessionToken');

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
                {authenticated ? (
                    <div className='voting-container'>
                        <h2>Voter : {userData.first_name}</h2>
                        <form onSubmit={onSubmitVote}>
                            <ContenderList contenders={contenderData} />
                            <br />
                            <input type="submit" />
                        </form>
                    </div>
                ) : (
                    <center className="notloggedin-container">
                        <h1>Please login</h1>
                    </center>
                )}
        </div>
    );
}

export default Vote;