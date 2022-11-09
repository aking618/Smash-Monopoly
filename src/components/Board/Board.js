import React from "react";
import "./styles.css";
import Tile from "../Tile/Tile";
import { boardInfo } from "../../models/boardInfo";
import FightPopup from "../FightPopup/FightPopup";
import StealCharacterPopup from "../StealCharacterPopup/StealCharacterPopup";
import PlayerControls from "../PlayerControls/PlayerControls";
import FreeCharacterPopup from "../FreeCharacterPopup/FreeCharacterPopup";
import WinnerPopup from "../WinnerPopup/WinnerPopup";

const SmashMonopolyBoard = ({ ctx, G, moves }) => {
  const handleStealCharacter = (pos) => moves.stealCharacter(pos);
  const handleWinner = (playerID) => moves.pickWinner(playerID);
  const handlePickFreeCharacter = (pos) => moves.pickFreeCharacter(pos);

  return (
    <div className="container">
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
      <PlayerControls G={G} ctx={ctx} moves={moves} />

      {G.showStealPopup && (
        <StealCharacterPopup
          G={G}
          matchWinner={G.matchWinner}
          handleStealCharacter={(pos) => {
            handleStealCharacter(pos);
          }}
        />
      )}
      {G.showSelectFreeCharacterPopup && (
        <FreeCharacterPopup
          G={G}
          ctx={ctx}
          handleResult={(pos) => {
            handlePickFreeCharacter(pos);
          }}
        />
      )}
      {ctx.gameover && <WinnerPopup ctx={ctx} />}
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
              corner={tile.corner}
              player1Pos={tile.pos === G.player1Pos}
              player2Pos={tile.pos === G.player2Pos}
              ownedBy={G.cells[tile.pos]}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SmashMonopolyBoard;
