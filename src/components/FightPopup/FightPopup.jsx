import React from "react";
import "./styles.css";

const FightPopup = ({ p1Fighter, p2Fighter, handleWinner }) => {
  return (
    <div className="popup-container">
      <h2>FIGHT!</h2>
      <p>Player One will record the results of the match.</p>

      <div className="fighter-options">
        <div className="fighter-container">
          <div className="fighter-img">{p1Fighter.image}</div>
          <div className="fighter-title">{p1Fighter.title}</div>
          <button className="fighter-btn" onClick={() => handleWinner("0")}>
            Winner
          </button>
        </div>
        <div className="fighter-container">
          <div className="fighter-img">{p2Fighter.image}</div>
          <div className="fighter-title">{p2Fighter.title}</div>
          <button className="fighter-btn" onClick={() => handleWinner("1")}>
            Winner
          </button>
        </div>
      </div>
    </div>
  );
};

export default FightPopup;
