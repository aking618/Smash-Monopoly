import React from "react";
import "./styles.css";

const Home = ({ matchID, setMatchID, updatePlayerId }) => {
  return (
    <div className="home-container">
      <h2>Welcome to Smash Monopoly!</h2>
      <div className="choose-match-wrapper">
        <p className="match-label">Enter the desired match id:</p>
        <div className="matchId-input-group">
          <span htmlFor="matchId">Match ID</span>
          <input
            className="matchId-input-field"
            id="matchId"
            type="text"
            value={matchID}
            onChange={(e) => {
              setMatchID(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="choose-player-wrapper">
        <p className="choose-player-title">Choose who to enter the match as:</p>
        <button
          className="choose-player-btn"
          onClick={() => updatePlayerId("0")}
        >
          Player 1
        </button>
        <button
          className="choose-player-btn"
          onClick={() => updatePlayerId("1")}
        >
          Player 2
        </button>
      </div>
    </div>
  );
};

export default Home;
