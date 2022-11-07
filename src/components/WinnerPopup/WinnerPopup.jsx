import React from "react";
import "./styles.css";

const WinnerPopup = ({ ctx }) => {
  return (
    <div className="steal-popup-container winner-character-container">
      <h2>Congrats!</h2>
      <p>{`Player ${ctx.gameover.winner} won!`}</p>
      <button
        className="choose-player-btn reload-btn"
        onClick={() => window.location.reload(false)}
      >
        EXIT
      </button>
    </div>
  );
};

export default WinnerPopup;
