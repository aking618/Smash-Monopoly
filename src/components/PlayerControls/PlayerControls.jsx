import React from "react";
import "./styles.css";

const PlayerControls = ({ G, ctx, moves }) => {
  const onClick = () => moves.roll();

  return (
    <div className="player-control-container">
      <p className="player-control-title">{`Current Player: ${ctx.currentPlayer}`}</p>
      <button
        className="choose-player-btn player-control-btn"
        disabled={G.showFightPopup || G.showStealPopup}
        onClick={() => onClick()}
      >
        ROLL
      </button>
      <div className="roll-value">{`Roll value: ${G.roll}`}</div>
    </div>
  );
};

export default PlayerControls;
