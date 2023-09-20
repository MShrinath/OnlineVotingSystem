import React from "react";

const VoterList = ({ voters }) => {
    return (
        <div className="e_voter">
            {voters.map((voter) => (
                <>  
                    <img src={voter.PartySymbol} alt={voter.PartyName} />
                    <h1>{voter.PartyName}</h1>
                    <h1>{voter.Contender}</h1>
                </>
            ))}
        </div>
    );
};

export default VoterList;
