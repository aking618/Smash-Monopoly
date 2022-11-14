import React from "react";
import Tile from "../Tile/Tile";
import "./styles.css";

const FightPopup = ({ G, p1Fighter, p2Fighter, handleWinner }) => {
  return (
    <div className="popup-container">
      <h2>FIGHT!</h2>
      <p>Player One will record the results of the match.</p>

      <div className="fighter-options">
        <div className="fighter-container">
          <Tile
            image={p1Fighter.image}
            strip={p1Fighter.strip}
            stripColor={p1Fighter.stripColor}
            title={p1Fighter.title}
            ownedBy={G.cells[p1Fighter.pos]}
          />
          <button className="fighter-btn" onClick={() => handleWinner("0")}>
            Winner
          </button>
        </div>
        <div className="fighter-container">
          <Tile
            image={p2Fighter.image}
            strip={p2Fighter.strip}
            stripColor={p2Fighter.stripColor}
            title={p2Fighter.title}
            ownedBy={G.cells[p2Fighter.pos]}
          />
          <button className="fighter-btn" onClick={() => handleWinner("1")}>
            Winner
          </button>
        </div>
      </div>
    </div>
  );
};

export default FightPopup;
