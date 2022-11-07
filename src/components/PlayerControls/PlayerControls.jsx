import React from "react";
import "./styles.css";

const PlayerControls = ({ G, ctx, moves }) => {
  const onClick = () => moves.roll();

  return (
    <div className="player-control-wrapper">
      <div>{`Current Player: ${ctx.currentPlayer}`}</div>
      <button
        className="choose-player-btn player-control-btn"
        disabled={G.showPopup}
        onClick={() => onClick()}
      >
        ROLL
      </button>
    </div>
  );
};

export default PlayerControls;
