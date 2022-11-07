import React from "react";
import "./styles.css";

const PlayerControls = ({ G, ctx, moves }) => {
  const onClick = () => moves.roll();

  return (
    <div className="player-control-wrapper">
      <p className="player-control-title">{`Current Player: ${ctx.currentPlayer}`}</p>
      <button
        className="choose-player-btn player-control-btn"
        disabled={G.showFightPopup || G.showStealPopup}
        onClick={() => onClick()}
      >
        ROLL
      </button>
    </div>
  );
};

export default PlayerControls;
