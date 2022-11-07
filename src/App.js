import React, { useEffect, useState } from "react";
import { Client, Lobby } from "boardgame.io/react";
import { Local, SocketIO } from "boardgame.io/multiplayer";
import TicTacTocBoard from "./components/Board/Board";
import { TicTacToe } from "./Game";
import Home from "./components/Home/Home";

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
    <>
      {playerID === null ? (
        <Home
          matchID={matchID}
          setMatchID={setMatchID}
          updatePlayerId={(e) => setPlayerID(e)}
          />
      ) : (
        <div>
          <TicTacToeClient playerID={playerID} matchID={matchID} />
        </div>
      )}
    </>
  );
};

export default App;
