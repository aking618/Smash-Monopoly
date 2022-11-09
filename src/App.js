import React, { useState } from "react";
import { Client } from "boardgame.io/react";
import { SocketIO } from "boardgame.io/multiplayer";
import SmashMonopoly from "./Game/Game";
import Home from "./components/Home/Home";
import SmashMonopolyBoard from "./components/Board/Board";

const SmashMonopolyClient = Client({
  game: SmashMonopoly,
  debug: true,
  board: SmashMonopolyBoard,
  multiplayer: SocketIO({ server: "localhost:8000" }),
});

const App = () => {
  const [playerID, setPlayerID] = useState(null);
  const [matchID, setMatchID] = useState("default");

  return (
    <div>
      {playerID === null ? (
        <Home
          matchID={matchID}
          setMatchID={setMatchID}
          updatePlayerId={(e) => setPlayerID(e)}
        />
      ) : (
        <div>
          <SmashMonopolyClient playerID={playerID} matchID={matchID} />
        </div>
      )}
    </div>
  );
};

export default App;
