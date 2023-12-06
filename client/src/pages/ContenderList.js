import React from "react";
import "../css/Vote.css";


const ContenderList = ({ contenders }) => {
    return (
        <div className="contender-container">
            {contenders.map((contender, index) => (
                <div key={index}>
                    <img src={contender.PartySymbol} alt={contender.PartyName} />
                    <h1>{contender.PartyName}</h1>
                    <h1>{contender.Contender}</h1>
                    <input
                        type="radio"
                        id={"Contender"+index}
                        name="voting"
                    />
                </div>
            ))}
        </div>
    );
};

export default ContenderList;
