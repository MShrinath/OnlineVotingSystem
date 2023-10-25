import React from "react";
import "../css/Vote.css";


const VoterList = ({ voters }) => {
    return (
        <div className="e_voter">
            {voters.map((voter, index) => (
                <>
                    <img src={voter.PartySymbol} alt={voter.PartyName} />
                    <h1>{voter.PartyName}</h1>
                    <h1>{voter.Contender}</h1>
                    <input
                        type="radio"
                        id={"Voter"+index}
                        name="voting"
                    />
                </>
            ))}
        </div>
    );
};

export default VoterList;
