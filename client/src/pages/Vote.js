import React from "react";
import VoterList from "./VoterList";
import "../css/Vote.css";
import LS from "../images/logo.png";

function Vote() {
    const votersData = [
        {
            PartySymbol: LS,
            Contender: "Alice",
            PartyName: "Party1"
        },
        {
            PartySymbol: LS,
            Contender: "Bob",
            PartyName: "Party2"
        },
        {
            PartySymbol: LS,
            Contender: "Charlie",
            PartyName: "Party3"
        },
    ];

    return (
        <div >
            <center><h1>VOTE</h1></center>
            <VoterList voters={votersData} />
        </div>
    );
}

export default Vote;
