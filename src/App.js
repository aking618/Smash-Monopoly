import React, { useEffect, useState } from "react";
import { Client, Lobby } from "boardgame.io/react";
import { Local, SocketIO } from "boardgame.io/multiplayer";
import TicTacTocBoard from "./components/Board/Board";
import { TicTacToe } from "./Game";

/// Local
// const TicTacToeClient = Client({
//   game: TicTacToe,
//   board: TicTacTocBoard,
//   multiplayer: Local({
//     persist: true,

//     storageKey: 'bgio'
//   }),
// });

/// Remote
const TicTacToeClient = Client({
  game: TicTacToe,
  debug: true,
  board: TicTacTocBoard,
  multiplayer: SocketIO({ server: "localhost:8000" }),
});

const App = () => {
  const [playerID, setPlayerID] = useState(null);
  const [matchID, setMatchID] = useState("default");

  return (
    <div>
      {playerID === null ? (
        <div>
          <input
            type="text"
            value={matchID}
            onChange={(e) => {
              setMatchID(e.target.value);
            }}
          />
          <p>Play as</p>
          <button onClick={() => setPlayerID("0")}>Player 1</button>
          <button onClick={() => setPlayerID("1")}>Player 2</button>
        </div>
      ) : (
        <div>
          <TicTacToeClient playerID={playerID} matchID={matchID} />
        </div>
      )}
    </div>
  );
};

export default App;
