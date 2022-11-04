import React from "react";
import "./styles.css";
import Tile from "../Tile/Tile";
import { boardInfo } from "../../models/boardInfo";
import FightPopup from "../FightPopup/FightPopup";
import StealCharacterPopup from "../StealCharacterPopup/StealCharacterPopup";

const TicTacTocBoard = ({ ctx, G, moves }) => {
  const onClick = () => moves.roll();

  const handleWinner = (playerID) => moves.pickWinner(playerID);

  const handleStealCharacter = (pos) => moves.stealCharacter(pos);

  let { currentPlayer } = ctx;

  let winner = "";
  if (ctx.gameover) {
    winner =
      ctx.gameover.winner !== undefined ? (
        <div id="winner">Winner: {ctx.gameover.winner}</div>
      ) : (
        <div id="winner">Draw!</div>
      );
  }

  return (
    <div>
      <div>{`Current Player: ${currentPlayer}`}</div>
      <button disabled={G.showPopup} onClick={() => onClick()}>
        ROLL
      </button>
      {G.showFightPopup && (
        <FightPopup
          p1Fighter={boardInfo
            .filter((n) => n)
            .find((tile) => tile.pos === G.player1Pos)}
          p2Fighter={boardInfo
            .filter((n) => n)
            .find((tile) => tile.pos === G.player2Pos)}
          handleWinner={(playerId) => {
            handleWinner(playerId);
          }}
        />
      )}
      {G.showStealPopup && (
        <StealCharacterPopup
          G={G}
          matchWinner={G.matchWinner}
          handleStealCharacter={(pos) => {
            handleStealCharacter(pos);
          }}
        />
      )}
      <div className="boardContainer">
        {boardInfo.map((tile, index) => {
          if (tile === null) {
            return <div className="filler" key={index} />;
          }

          return (
            <Tile
              key={index}
              strip={tile.strip}
              stripColor={tile.stripColor}
              top={tile.top}
              left={tile.left}
              right={tile.right}
              title={tile.title}
              image={tile.image}
              player1Pos={tile.pos == G.player1Pos}
              player2Pos={tile.pos == G.player2Pos}
              ownedBy={G.cells[tile.pos]}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TicTacTocBoard;
