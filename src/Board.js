import React from "react";
import "./styles.css";
import Tile from "./Tile";
import {boardInfo} from "./boardInfo";

const TicTacTocBoard = ({ ctx, G, moves, reset }) => {
  const onClick = () => moves.roll();

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

  G.turn = ctx.turn
  console.log(G.turn);

  return (
    <div>
      <div>{`Current Player: ${currentPlayer}`}</div>
      <button onClick={() => onClick()}>ROLL</button>
      <div className="boardContainer">
        {
            boardInfo.map(tile => {
                if (tile === null) {
                    return <div className="tile filler" />
                }

                return (
                    <Tile
                        strip={tile.strip}
                        stripColor={tile.stripColor}
                        left={tile.left}
                        right={tile.right}
                        title={tile.title}
                        image={tile.image}
                        player1Pos={tile.pos == G.player1Pos}
                        player2Pos={tile.pos == G.player2Pos}
                        />
                );
            })
        }
      </div>
    </div>
  );
};

export default TicTacTocBoard;
